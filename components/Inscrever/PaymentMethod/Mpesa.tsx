
import { InputField } from '@/components/ui/inputField';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/ui/loading-button';
import mpesaLogo from '@/public/images/Mpesa-logo.png';
import Image from 'next/image';
import { CircleX, Phone } from 'lucide-react';
import { InputCuppon } from '@/components/InputCuppon';
import { addassociationPackage, confirmarPagamento, getCursoIdMoodle, getCursoRegistado, validarCupon } from '@/components/Cursos/actions';
import LoadingBounce from '@/components/ui/loadingBounce';
import Modal from './Modal'; // Importando o componente Modal
import toast from 'react-hot-toast';
import { Cursos } from '@/components/types/types';
import apiClient from '@/lib/axios-config-clientResquests';
import { routes } from '@/config/routes';
import { adicionarAlunoCursoMoodle, adicionarAoCurso, adicionarAoGrupoEssencial, registerMoodleUser } from '@/services/moodle';
import { processarPagamentoMpesa, registerPayment } from '@/services/payments';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import api from '@/lib/axiosConfig';


interface Props {
  curso: Cursos;
  userData: {
    alunoId: string;
    nomeAluno: string;
    emailAluno: string;
    apelidoAluno: string;
  };
  preco: number;
  pacote? : string;
  idAssociacao? : string;
}

const paymentSchema = z.object({
  mpesaNumber: z.string()
    .regex(/^(84|85)\d{7}$/, { message: 'Número M-Pesa deve ser da vodacom (84 ou 85) e ter 9 dígitos' }),
  cuppon: z.string().optional(),
});

type PaymentSchema = z.infer<typeof paymentSchema>;


function Mpesa({ curso, userData, preco, pacote, idAssociacao}: Props) {
  const router = useRouter()
  const { register, handleSubmit, formState: { isSubmitting, errors  } } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
  });
  const [valorPagar, setValorPagar] = useState<number | null>(null);
  const [desconto, setDesconto] = useState<number>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingCupon, setLoadingCupon] = useState<boolean>(false);
  const [cuppon, setCuppon] = useState('');
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null); // Controla a mensagem de status do pagamento


  useEffect(() => {
    const validateCupom = async () => {
      if (cuppon) {
        try {
          setErrorMessage('');
          setValorPagar(null);
          setLoadingCupon(true);
          const response = await validarCupon(cuppon, preco);
          if (response.status) {
            setErrorMessage('Cupão Inválido.');
            setLoadingCupon(false);
          }
          if(cuppon.length === 3){
            setLoadingCupon(false);
            setErrorMessage("")
          }
          setValorPagar(response.valorDescontado ? (Number(response?.valorDescontado)) : null);
          setDesconto(Number(response?.desconto)); // Pegar o desconto do cupom
          setLoadingCupon(false);
        } catch (error) {
          console.error('Erro ao validar cupom:', error);
        }
      }
    };
    console.log("Pacote",pacote)
    validateCupom();
  }, [cuppon]);

  const handlePaymentMpesa = async (data: PaymentSchema) => {
    const getDefaultFile = async () => {
      const response = await fetch('/images/Mpesa-logo.png');
      const blob = await response.blob();
      const file = new File([blob], 'Mpesa-logo.png', { type: 'image/png' });
      return file;
    };
    
    const defaultFile = await getDefaultFile();
    const { mpesaNumber } = data;
    const PRECO = valorPagar ? valorPagar : preco;
  
    // Dados para pagamento e Moodle
    const cuponData = {
      cupom: cuppon.toString(),
      valor: valorPagar?.toString(),
      idStudantUse: userData.alunoId.toString(),
      idCourse: curso.id.toString()
    };
    
    const formData = new FormData();
    formData.append('nomeCurso', curso.nome);
    formData.append('nomealuno', userData.nomeAluno);
    formData.append('id_curso', curso.id.toString());
    formData.append('id_aluno', userData.alunoId);
    formData.append('emailaluno', userData.emailAluno);
    formData.append('tipocurso', curso.tipocurso);
    formData.append('desconto', desconto ? desconto.toString() : "0");
    formData.append('imagem', defaultFile);
  
    const dadosMoodle = {
      idAluno: userData.alunoId,
      nome: userData.nomeAluno,
      lastname: userData.apelidoAluno,
      email: userData.emailAluno
    };    
  
    // Passo 1: Verificar se o aluno está inscrito
    try {
      setShowModal(true);
      setPaymentStatus("Verificando inscrição...");
      const cursoRegistado = await getCursoRegistado(Number(userData.alunoId));
      const estaInscrito = cursoRegistado.some((course: any) => course.id_curso === curso.id);
  
      if (estaInscrito) {
        toast.error('Já está inscrito neste curso!');
        setPaymentStatus('Já está inscrito neste curso!');
        return;
      }
    } catch (error) {
      toast.error('Erro ao verificar inscrição.');
      setPaymentStatus('Erro ao verificar inscrição.');
      return;
    }
    // Passo 2: Processar Pagamento M-Pesa
    try {
      setPaymentStatus('Processando o pagamento M-Pesa...');
      const paymentResponse = await processarPagamentoMpesa(mpesaNumber,PRECO)
      if (paymentResponse.success) {
        setPaymentStatus(paymentResponse.message);
      } else {
        // toast.error('Falha ao processar o pagamento M-Pesa.');
        setPaymentStatus(paymentResponse.message);
        return
    
      }
      // Passo 3: Registrar Pagamento
      setPaymentStatus('Carregando o curso...');
      const response = await registerPayment(formData)
  
      if (!response?.sucess) {
        toast.error('Erro ao registrar o pagamento.');
        setPaymentStatus(response?.message ?? 'Erro ao registrar o pagamento.');
        return;
      }
       
      // INsCRICAO NO CURSO PRESENCIAL
      if(curso.tipocurso.toLocaleLowerCase() === "presencial"){
        setPaymentStatus("Confirmando a inscrição ao curso");
        const confirmacao = await confirmarPagamento(curso.id.toString(),userData.alunoId)
        
        if(confirmacao?.success){
          setPaymentStatus("Inscrição finalizada com sucesso!");
          router.push("/user/perfil")
        }else{
          console.error("erro ao confirmar inscricao:", confirmacao.message)
          setPaymentStatus("Erro confirmar inscricao!");
        } 
        

        return
      }
      
      
      if(idAssociacao){
        setPaymentStatus('Associando ao pacote...');
        const response =  await addassociationPackage(idAssociacao, curso.id ,userData.alunoId);
        console.log( "=========================================",response); 

        if(response?.status === 200 || response?.status === 201){
          toast.success('Associação com sucesso.');
          return
        }
        else if(response?.status === 400){
          setPaymentStatus(`Já está associado ao (${pacote}) neste curso `)
        }
      }
      // Passo 4: Inscrever no Moodle
      try {
        setPaymentStatus("Cadastrando no Moodle...");
        const moodleResponse = await registerMoodleUser(userData)
  
        if (moodleResponse?.sucess) {
          const userIdMoodle = moodleResponse?.user.id;
          setPaymentStatus("Adicionando o ao curso ")
          
          const addAoCurso = await adicionarAlunoCursoMoodle(Number(curso.id),userIdMoodle,pacote)
  
          if (addAoCurso?.sucess) {
            // toast.success('Aluno adicionado ao curso e ao grupo com sucesso!');  
            setPaymentStatus("Confirmando a inscrição ao curso");
            const confirmacao = await confirmarPagamento(curso.id.toString(),userData.alunoId)
            
            if(confirmacao?.success){
              setPaymentStatus("Inscrição confirmada com sucesso!");
              router.push("/user/perfil")
            }else{
              console.error("erro ao confirmar inscricao:", confirmacao.message)
              setPaymentStatus("Erro confirmar inscricao!");
            }  
          }
          else{
            toast.error('Erro ao adicionar ao curso.');
            setPaymentStatus(addAoCurso?.message || "Erro ao add ao curso");
            return;
          }
        } else {
          setPaymentStatus(moodleResponse?.message);
          throw new Error('Erro ao cadastrar no Moodle');
        }
      } catch (err) {
        console.error('Erro ao registrar no Moodle:', err);
        setPaymentStatus('Erro ao registrar no Moodle.');
      
      }
  
      // Associar cupom, se existir
      if (cuppon) {
        try {
          const cupomResponse = await api.post(routes.cuponAssociacion, cuponData);
          if (cupomResponse.status === 200) {
            toast.success('Cupão associado com sucesso!');
          } else {
            toast.error('Erro ao associar o cupão.');
            console.error('Erro ao associar o cupão:,cupomResponse');
          }
        } catch (error:any) {
          toast.error('Erro ao associar o cupão: ' + error.message);
        }
      }
    } catch (error) {
      setPaymentStatus('Erro no processo. Tente novamente.');
    } finally {

    }
  };
  
  ;
  
  function closeModal(){
    setShowModal(false); // Fecha o modal
    
  }

  return (
    <>
      {/* Modal para mostrar carregamento e feedback */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className='w-full h-[25svh] md:h[40svh] lg:h-[40svh] flex flex-col justify-between items-center py-5'>
          <div className='w-full flex gap-3 px-5'>
              <Image src={mpesaLogo} alt="Pagamento Mpesa" className='h-[4.5rem] w-auto rounded-md' />
              <p className='flex flex-col'>
                <p className='font-semibold text-lg'>Pague com Mpesa</p>
                <p className='lg:text-sm text-xs'>Por favor, digite o seu pin no celular e
                <span className='lg:text-sm text-xs'> aguarde a confirmação do pagamento</span></p>
              </p>
          </div>
          <div className="p-4 h-full text-center flex flex-col justify-center items-center ">


            {paymentStatus && (
              <div className='flex flex-col gap-3' >
                <p className='whitespace-pre-line'>{paymentStatus}</p>
                {isSubmitting && <LoadingBounce />} {/* Ícone de carregamento */}

              </div>


            )}

          </div>
          <Button className='w-1/3' onClick={closeModal}>Fechar</Button>
        </div>
      </Modal>

      <form onSubmit={handleSubmit(handlePaymentMpesa)}>
        <div className='flex gap-2 mb-4'>
          <Image src={mpesaLogo} alt="Pagamento Mpesa" className='h-[4.5rem] w-auto rounded-md' />
          <p className='flex flex-col '>
            <span className='font-semibold'>Pague com Mpesa</span>
            <span className='text-xs'>Por favor, insira um número M-pesa válido.</span>
            <span className='text-xs'>Receberá uma notificação para inserir o seu <br />pin e confirmar o pagamento.</span>
          </p>
        </div>

        <InputField 
          label='Número M-Pesa:'
          icon={<Phone />}
          {...register('mpesaNumber')}
          placeholder='Introduza o número M-Pesa'
          className="w-full"
          errorMessage={errors.mpesaNumber?.message}
        />

        <div className='-mt-2'>
          <InputCuppon cuppon={cuppon} setCuppon={setCuppon} />

          {loadingCupon && (<span className='-mt-2 flex items-center text-sm py-2'>Calculando desconto<LoadingBounce /></span>)}

          {errorMessage && (<span className='-mt-2 text-sm text-red-500 flex items-center gap-1 py-1'><CircleX className='w-4 text' /> {errorMessage}</span>)}

          {valorPagar && (
            <div className=" -mt-2 text-muted-foreground flex flex-col gap-1 py-2">
              <p className='text- font-bold'>Desconto: <span className='text-primary text-base'>{desconto?.toFixed(2)} MZN</span></p>
              <p className='text- font-bold'>Valor a pagar: <span className='text-primary text-lg'>{valorPagar.toFixed(2)} MZN</span></p>
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full sm:w-1/3 lg:w-1/2 dark:text-accent-foreground ">
          {isSubmitting ? (
            <>
              <LoadingButton /> Carregando...
            </>
          ) : "Finalizar inscrição"}
        </Button>
      </form>
    </>
  );
}


export default Mpesa;
