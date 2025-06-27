import Link from "next/link";
import { MailInput } from "../ui/mailInput";
import Image from "next/image";
import logoUnitec from "@/public/images/UnitecFooterNew.png"
import facebook from "@/public/images/social-1.svg"
import twitter from "@/public/images/x-white.svg"
import insta from "@/public/images/social-3.svg"
import linkedin from "@/public/images/linkedin.png"
import phone from "@/public/images/phone.svg"
import email from "@/public/images/email.svg"
import tiktok from "@/public/images/tiktok-white-icon.svg"
import marker from "@/public/images/marker2.svg"
import youtube from "@/public/images/youtube-app-white-icon.svg"
import { Button } from "../ui/button"
import whatsapp from "@/public/images/whatsapp.png"
import { TermsOfUse } from "./Modal/Terms";
import { ArrowRight, ClipboardPenLine, DollarSign, Handshake } from "lucide-react";
import FormaPagamento from "../Inscrever/PaymentMethod/FormaPagamento";


export function FooterDesktop() {
  return (
    <footer className="bg-primary z-10">
      <div className='hidden  text-primary-foreground w-full  lg:flex justify-center items-center px-8 py- mt-10'>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        <div >
          <div className='flex flex-col  gap-4 w-full'>
            <div className='flex gap-3  items-center'>
              <Image alt="logos" width={105} src={logoUnitec} />
            </div>
              <p className="italic text-xs">Conectando o Presente ao Futuro</p>
            <div className=' flex flex-col'>
              <TermsOfUse />
              <p className='text-xs'>©️ 2025 Unitec Moçambique</p>
            </div>
            <div className="absolute translate-y-28">
            <FormaPagamento />
          </div>
          </div>
        </div>

        {/* CONTACTOS */}
        <ul className="text-xs leading-loose flex flex-col space-y-2">
          <Link
            href="https://api.whatsapp.com/send?phone=+258834303184&text=Olá,%20gostaria%20de%20Saber%20mais%20acerca%20dos%20cursos."
            passHref
            className="flex"
          >
            <Button
              className='text-muted-foreground text-xs border-2 border-[#CDFFCB] hover:text-primary gap-3 w-40 h-9'
              variant={"outline"}
            >
              Fale Connosco
              <Image src={whatsapp} alt="Whatsapp" className=" h-7 w-7" priority blurDataURL='/images/skeleton.gif' placeholder='blur' />
            </Button>
          </Link>
          <li className="flex gap-2 items-center text-xs">
            <Image src={phone} alt="" />
            <Link href="tel:+258834303184">834303184</Link> |
            <Link href="tel:+258840111248">840111428</Link> |
            <Link href="tel:+258870088688">870088688</Link>
          </li>

          <li>
            <Link href="mailto:info@unitec.ac.mz" className="flex gap-2 items-center">
              <Image src={email} alt="" /> info@unitec.ac.mz
            </Link>
          </li>
          <li>
          <Link href="/bolsa" className="flex gap-2 items-center">
                <ClipboardPenLine size={16}/>Concorra a Bolsa 
              </Link>
          </li>
          <li>
          <Link href="/associados" className="flex gap-2 items-center">
                <Handshake size={16}/>Unitec Associados 
              </Link>
          </li>
        </ul>
        <div className='flex flex-col gap-3 text-sm' >
          <div className='flex  mx-auto '>
            <ul className="w-full mx-auto grid grid-cols-3 grid-rows-1 gap-4 text-xs">
              <li className="">
                <Link href="https://www.facebook.com/unitec.academy/" target="_blank">
                  <Image alt='facebook' src={facebook} width={9} className="hover:-translate-y-1 transition-all ease-in-out" />
                </Link>
              </li>
              <li className="">
                <Link href="https://x.com/OnlineUnitec" target="_blank">
                  <Image alt='facebook' src={twitter} width={19} className="hover:-translate-y-1 transition-all ease-in-out" />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/unitec.academy/" target="_blank">
                  <Image alt='facebook' src={insta} width={18} className="hover:-translate-y-1 transition-all ease-in-out" />
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex  mx-auto '>
            <ul className="w-full mx-auto pb-[6px] grid grid-cols-3 justify-center grid-rows-1 gap-4 text-xs">
              <li>
                <Link href="https://www.tiktok.com/@unitec.academy" target="_blank">
                  <Image alt='facebook' src={tiktok} width={18} className="hover:-translate-y-1 transition-all ease-in-out" />
                </Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/@unitec.academy" target="_blank">
                  <Image alt='facebook' src={youtube} width={22} className="hover:-translate-y-1 transition-all ease-in-out" />
                </Link>
              </li>
              <li className="">
                <Link href="https://mz.linkedin.com/company/unitec-academy" target="_blank" className="flex items-center">
                  <Image alt='facebook' src={linkedin} width={18} className="hover:-translate-y-1 transition-all ease-in-out" />
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex  mx-auto '>
            <ul className="w-full mx-auto flex justify-center items-start gap-4 align-middle flex-col text-xs">
                <li className="footer--item">
                  <Link className="flex gap-2 items-center" href="https://maps.app.goo.gl/fkEqApF2w6m1fEJZ9" target="_blank">
                    <Image src={marker} alt="" /> Av. Salvador Allende Nº.60, Maputo
                  </Link>
                </li>
                <li className="footer--item">
                  <Link className="flex gap-2 items-center" href={"https://maps.app.goo.gl/nswRBfL4fmULfVaJ8"} target="_blank">
                    <Image src={marker} alt="" /> Av. Filipe Samuel Magaia Nº.552, Maputo
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        <div>
          <div className=''>
            <MailInput />
          </div>
          <Link
            href="https://whatsapp.com/channel/0029Vb0E1WPDzgTJ6KWkJ82b"
            passHref
            className="flex justify-center"
          >
            <Button
              className='text-white text-xs border rounded-l-full gap-3 w-full h-9 mt-3'
              variant={"link"}
            >
              Faça parte do nosso canal de ofertas
              <ArrowRight className="items-center h-7 w-7" />
            </Button>
          </Link>
        </div>
      </div>
      </div>
      
    </footer>
  )
}