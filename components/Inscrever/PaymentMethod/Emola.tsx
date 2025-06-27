import Image from "next/image";
import { ListItem } from "../SectionAccounts";
import emola from '@/public/images/emola.png';
import { Cursos } from "@/components/types/types";
import Transferencia from "./Transferencia";

interface Props {
  curso: Cursos;
  userData: {
    alunoId: string;
    nomeAluno: string;
    emailAluno: string;
  };
  preco: number;
  pacote : string;
  idAssociacao: string;
  valorDescontado:number;
  horario: string;
}
function Emola({ curso, userData, preco, pacote,idAssociacao, valorDescontado, horario}: Props) {
  return (
    <div className="flex flex-col">
      <div className='flex gap-2'>
        <Image src={emola} alt="Pagamento Mpesa" className='h-[4.5rem] w-auto rounded-md' />
        <p className='flex flex-col justify-center'>
          <span className='font-semibold'>Pague com Emola</span>
        </p>
      </div>
      <div className="grid grid-rows-1 md:grid-cols-2 gap-5 py-6">
        <ul className=" md:order-last text-sm mb-2 ">
          <h4 className="font-semibold text-lg  mb-1 mt-1">Como fazer o Pagamento?</h4>
          <ListItem text="Digita, *898#" />
          <ListItem text="Esolha a opção 9 (Pagamentos)" />
          <ListItem text="Escolha a opção 1 (Comerciante)" />
          <div className="flex items-center"><ListItem text="Digita o ID: " /> <span className="font-bold">801335</span> </div>
          <ListItem text="Digita o Valor do Curso." />
          <div className="flex items-center"><ListItem text="Digita o conteúdo:" /> <span className="font-bold">Inscricao</span> </div>
          <ListItem text="Confirma o nome 'Unitec Moçambique US' e confirme a transação." />
          <p className="font-semibold ml-1 mt-2">Bons <span className="text-primary">estudos!</span> Aproveite o seu aprendizado!</p>
        </ul>
      </div>

      <Transferencia
            curso={curso}
            pacote={pacote}
            userData={userData}
            preco={preco}
            idAssociacao={idAssociacao}
            valorDescontado={valorDescontado}
            horario={horario}
          />
    </div>
  );
}

export default Emola;
