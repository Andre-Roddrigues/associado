import Image from "next/image";
import study from '@/public/images/study-table.svg';
import award from '@/public/images/Award.svg';
import certificate from '@/public/images/Certificate.svg';
import graduation from '@/public/images/Graduation.svg';

export function CardSection() {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-5  lg:gap-10 bg-gray-100 justify-center items-center md:items-start p-4">
                <div className="lg:w-1/5 w-11/12 md:w-[50%]  p-5 transition-all transform hover:animate-bounceAndResize shadow-lg bg-white">
                    <div className="bg-[#D2E6FF] flex justify-center items-center h-20 w-20 rounded-full">
                        <Image src={study} alt="Ilustração do Herói" className="items-center" blurDataURL='/images/skeleton.gif' placeholder='blur' priority />
                    </div>
                    <div className="text-sm font-bold text-neutral-500 mt-4">Estude ao seu ritmo</div>
                    <p className="mt-4 text-xs text-neutral-500 font-medium">
                        Tenha liberdade e faça os seus horários! Estude quando e onde quiser, quantas vezes você precisar.
                    </p>
                </div>
                <div className="lg:w-1/5 w-11/12 md:w-[45%]  transition-all transform hover:animate-bounceAndResize p-5 bg-white shadow-lg">
                    <div className="bg-[#FFE8EA] flex justify-center items-center h-20 w-20 rounded-full ">
                        <Image src={certificate} alt="Certificado" className="items-center h-12 w-12" blurDataURL='/images/skeleton.gif' placeholder='blur' priority />
                    </div>
                    <div className="text-sm font-bold text-neutral-500 mt-4 lg:text-left">Certificado Profissional</div>
                    <p className="mt-4 text-xs text-neutral-500 font-medium lg:text-left">Certificado profissional válido em todo território nacional para você turbinar o seu currículo.</p>
                </div>
                <div className="lg:w-1/5 w-11/12 md:w-[45%] p-5 transition-all transform hover:animate-bounceAndResize mb-6 lg:mb-0 bg-white shadow-lg">
                    <div className="bg-[#FFFDC7] flex justify-center items-center h-20 w-20 rounded-full ">
                        <Image src={graduation} alt="Graduation" className="items-center" blurDataURL='/images/skeleton.gif' placeholder='blur' priority />
                    </div>
                    <div className="text-sm font-bold text-neutral-500 mt-4 lg:text-left">Desenvolvimento Profissional</div>
                    <p className="mt-4 text-xs text-neutral-500 font-medium lg:text-left">Desenvolva as competências para alcançar a sua carreira no mercado de trabalho ou no seu próprio negócio.</p>
                </div>
                <div className="lg:w-1/5 w-11/12 md:w-1/2 p-5 mb-8 transition-all transform hover:animate-bounceAndResize lg:mb-0 bg-white shadow-lg z-[3]">
                    <div className="bg-[#CDFFCB] flex justify-center items-center h-20 w-20 rounded-full ">
                        <Image src={award} alt="Award" className="items-center" blurDataURL='/images/skeleton.gif' placeholder='blur' priority />
                    </div>
                    <div className="text-sm font-bold text-neutral-500 mt-4 lg:text-left">Professores Qualificados</div>
                    <p className="mt-4 text-xs text-neutral-500 font-medium lg:text-left">Faça os melhores cursos com os melhores especialistas de sua área no conforto de sua casa.</p>
                </div>
            </div>
        </>
    )
}