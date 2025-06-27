import Link from "next/link";
import { MailInput } from "../ui/mailInput";
import Image from "next/image";
import logoLanguage from "@/public/images/languagecentericon.png"
import logoUnitec from "@/public/images/UnitecFooterNew.png"
import facebook from "@/public/images/social-1.svg"
import twitter from "@/public/images/x-white.svg"
import insta from "@/public/images/social-3.svg"
import linkedin from "@/public/images/icons8-linkedin-50.svg"
import youtube from "@/public/images/youtube-app-white-icon.svg"
import phone from "@/public/images/phone.svg"
import tiktok from "@/public/images/tiktok-white-icon.svg"
import email from "@/public/images/email.svg"
import marker from "@/public/images/marker2.svg"
import logoBpartner from "@/public/images/bpartnericon.png"
import whatsapp from "@/public/images/whatsapp.png"
import { Button } from "../ui/button";
import { TermsOfUse } from "./Modal/Terms";
import FormaPagamento from "../Inscrever/PaymentMethod/FormaPagamento";
import { ArrowRight, Clipboard, ClipboardList, FormInputIcon, Handshake, LucideMessageCircleQuestion } from "lucide-react";

export function FooterMobile() {
    return (
        <footer className='lg:hidden px-10 py-6 md:px-40 h-full bg-primary text-primary-foreground w-full z-10 flex mt-10 justify-center items-center'>

            <div className='flex h-full flex-wrap  items-center justify-center gap-2'>

                <div className="flex flex-col w-full gap-2 justify-between">
                    <div className="flex- "><Image alt="logos" width={100} src={logoUnitec} /></div>
                    <p className="italic text-xs">Conectando o Presente ao Futuro</p>
                </div>

                <div className="grid grid-cols-2 w-full gap-2 justify-between mt-3 ">
                    <div className="flex flex-col ">
                        <ul className="flex- flex flex-col gap-1 text-sm ">
                            <li className="flex gap-2"> <Link
                                href="https://api.whatsapp.com/send?phone=+258834303184&text=Olá,%20gostaria%20de%20Saber%20mais%20acerca%20dos%20cursos."
                                passHref >
                                <Button
                                    className='text-muted-foreground text-xs border-2 border-[#CDFFCB] hover:text-primary gap-3 w-32 px-12  h-9'
                                    variant={"outline"}
                                >
                                    Fale Connosco
                                    <Image src={whatsapp} alt="Whatsapp" className="items-center h-6 w-9" priority blurDataURL='/images/skeleton.gif' placeholder='blur' />
                                </Button>
                            </Link> </li>
                            <li> <Link className="flex gap-2" href="tel:+258834303184"><Image src={phone} alt="" />83 43 03 184</Link> </li>
                            <li> <Link className="flex gap-2" href="tel:+258840111248"><Image src={phone} alt="" />84 01 11 428</Link> </li>
                            <li> <Link className="flex gap-2" href="tel:+258870088688"><Image src={phone} alt="" />87 00 88 688</Link> </li>
                        </ul>
                    </div>

                    <div className=" ">
                        <ul className="w-full flex flex-row justify-end items-center gap-6 text-sm">
                            <li>
                                <Link href="https://www.tiktok.com/@unitec.academy" target="_blank">
                                    <Image alt='tiktok' src={facebook} width={15} className="hover:-translate-y-1 transition-all ease-in-out" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.youtube.com/@unitec.academy" target="_blank">
                                    <Image alt='youtube' src={twitter} width={28} className="hover:-translate-y-1 transition-all ease-in-out" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://mz.linkedin.com/company/unitec-academy" target="_blank" className="flex">
                                    <Image alt='linkedin' src={insta} width={23} className="hover:-translate-y-1 transition-all ease-in-out" />
                                </Link>
                            </li>
                        </ul>
                        <ul className="w-full flex flex-row justify-end items-center gap-6 text-sm mt-3 ">
                            <li>
                                <Link href="https://www.tiktok.com/@unitec.academy" target="_blank">
                                    <Image alt='tiktok' src={tiktok} width={20} className="hover:-translate-y-1 transition-all ease-in-out" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.youtube.com/@unitec.academy" target="_blank">
                                    <Image alt='youtube' src={youtube} width={25} className="hover:-translate-y-1 transition-all ease-in-out" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://mz.linkedin.com/company/unitec-academy" target="_blank" className="flex">
                                    <Image alt='linkedin' src={linkedin} width={23} className="hover:-translate-y-1 transition-all ease-in-out" />
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li className="">
                                <div className="flex justify-end mt-2">
                                    <FormaPagamento />
                                </div>
                            </li>
                        </ul>
                        <div className="flex justify-end ">
                        </div></div>
                </div>
                <div className="w-full my-4 flex flex-col gap-2 text-sm">
                    <p className=''>Subscreva-se para receber promoções e novidades</p>
                    <div className='w-full'>
                        <MailInput />
                    </div>
                    <Link
                        href="https://whatsapp.com/channel/0029Vb0E1WPDzgTJ6KWkJ82b" target="_blank"
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
                <div className="w-full">
                    <ul className="flex flex-col gap-1 text-sm ">
                        <li className="footer--item">
                            <Link href="mailto:info@unitec.ac.mz" className="flex gap-2 items-center">
                                <Image src={email} alt="" /> info@unitec.ac.mz
                            </Link>

                        </li>


                        <li className="footer--item">
                            <Link className="flex gap-2 items-center" href="https://maps.app.goo.gl/fkEqApF2w6m1fEJZ9" target="_blank">
                                <Image src={marker} alt="" /> Av. Salvador Allende Nº.60, Maputo
                            </Link>
                        </li>
                        <li className="footer--item">
                            <Link className="flex gap-2 items-center" href={"https://maps.app.goo.gl/nswRBfL4fmULfVaJ8"}>
                                <Image src={marker} alt="" /> Av. Filipe Samuel Magaia Nº.552, Maputo
                            </Link>
                        </li>
                        <li className="flex flex-col gap-1 mt-2">
                            <TermsOfUse />
                        </li>
                        <li className="flex flex-row gap-1 mt-2">
                        <Link href="/bolsa">
                                <p className='text-xs flex flex-row'><ClipboardList size={14}/> Concorra a Bolsa</p>
                            </Link>
                        </li>
                        <li className="flex flex-row gap-1 mt-2">
                        <Link href="/associados">
                                <p className='text-xs flex flex-row'><Handshake size={14}/> Unitec Associados</p>
                            </Link>
                        </li>
                        <li className="flex flex-col gap-1 mt-2">
                            <p className='text-xs'>©️ 2025  Unitec Moçambique</p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}