import React from "react";
import Title from "./Title";
import { Diamond } from "lucide-react";
import Image from "next/image";
import mbimLogo from "@/public/images/BIM-01.png";
import bciLogo from "@/public/images/bci.svg";
import absalogo from "@/public/images/absagroup.svg";
import mPesaLogo from "@/public/images/Mpesa-logo.png";

function SectionAccounts() {
  return (
    <div className="grid grid-rows-1 md:grid-cols-2 gap-5">
      <ul className=" md:order-last md:-ml-12 text-sm mb-2 ">
        <h4 className="font-semibold text-lg -mt-2 mb-1">Como se Inscrever no Curso?</h4>
        <ListItem text="1. Use uma das nossas contas para transferência do valor do curso." />
        <ListItem text="2. Carregue a foto do comprovativo de pagamento." />
        <ListItem text="3. Clique no botão Finalizar inscrição." />
        <ListItem text="4. Aguarde o processamento do pagamento ." />
        <p className="font-semibold ml-1 mt-2">Bons <span className="text-primary">estudos!</span> Aproveite o seu aprendizado!</p>
      </ul>

      <section className=" text-sm  h-full grid lg :grid-cols-[repeat(auto-fit,minmax(50%,1fr))] gap-y-4 ">
      
      </section>
    </div>
  );
}

export default SectionAccounts;

export function ListItem({ text }: { text: string }) {
  return (
    <li className="pl-1 lg:p-0.5 flex gap-2  ">
      {text}
    </li>
  );
}
