import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TermsOfUse() {
  return (
    <Dialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className='flex  flex-col overflow-hidden'
      >
        <div className='flex flex-grow flex-row items-end justify-between'>
          <div>
            <DialogTitle className='text-muted text-xs text-center'>
              Termos e Políticas de Uso
            </DialogTitle>
          </div>
        </div>
      </DialogTrigger>
      <DialogContainer className=''>
        <DialogContent
          style={{
            borderRadius: '24px',
          }}
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white text-sm  dark:border-zinc-50/10  dark:bg-zinc-900 sm:w-[500px]'
        >
          <ScrollArea className="h-[400px] lg:h-[500px] rounded-md border p-4">
            <div className='p-6'>
              <DialogTitle className='text-muted-foreground font-bold text-base'>
                Termos e Políticas de Uso
              </DialogTitle>
              <DialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
              >
                <h1 className="text-muted-foreground font-bold  mt-">Aceitação dos Termos</h1>
                <p className='mt-2 text-zinc-500 text-sm  dark:text-zinc-500'> 
                  Ao se inscrever ou usar a Unitec,
                  você aceita todos os termos e condições da plataforma.
                  A Unitec pode actualizar esses termos, e é importante
                  que os usuários verifiquem, periodicamente, para se manterem informados sobre quaisquer alterações.
                </p>
                <h1 className="text-muted-foreground font-bold  mt-3"> Conta de Usuário</h1>
                <p className='mt-2 text-zinc-500 text-sm  dark:text-zinc-500'>
                  Para acessar certos recursos, como a compra de cursos e participação em discussões, você precisa criar uma conta. Isso envolve fornecer informações precisas e manter sua senha em segurança. Você é responsável por todas as actividades que ocorrem sob sua conta, e a Unitec recomenda que você notifique a plataforma, imediatamente em caso de uso não autorizado.
                </p>
                <h1 className="text-muted-foreground font-bold  mt-3">Conteúdo</h1>
                <p className='mt-2 text-zinc-500 text-sm  dark:text-zinc-500'>
                  Os cursos são criados por instrutores independentes, e a Unitec não garante a qualidade, relevância ou eficácia do conteúdo. Os usuários têm acesso a materiais para aprendizado, mas devem avaliar a adequação dos cursos às suas necessidades. O conteúdo é protegido por direitos autorais, e é estritamente proibido copiá-lo, distribuí-lo ou usá-lo comercialmente, sem autorização.
                </p>
                <h1 className="text-muted-foreground font-bold  mt-3">Pagamentos e Taxas</h1>
                <p className='mt-2 text-zinc-500 text-sm  dark:text-zinc-500'>
                  A Unitec cobra por cursos, com preços que podem variar. Os usuários concordam em pagar todos os encargos associados às compras feitas na plataforma. Além disso, os preços podem ser alterados a critério da Unitec, e promoções podem ser oferecidas. A política de preços inclui a possibilidade de taxas adicionais em algumas transacções.
                </p>
                <h1 className="text-muted-foreground font-bold  mt-3"> Política de Reembolso</h1>
                <p className='mt-2 text-zinc-500 text-sm  dark:text-zinc-500'>
                  A Unitec tem uma política de reembolso que permite que os usuários solicitem reembolsos dentro de um determinado período após a compra geralmente 7 dias. 
                </p>
              </DialogDescription>
            </div>
          </ScrollArea>
          <DialogClose className='text-primary outline-none' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
