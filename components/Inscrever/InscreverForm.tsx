"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Emola from "./PaymentMethod/Emola";
import CartaoCredito from "./PaymentMethod/CartaoCredito";
import Mpesa from "./PaymentMethod/Mpesa";
import Transferencia from "./PaymentMethod/Transferencia";
import FormaPagamento from "./PaymentMethod/FormaPagamento";
import SectionAccounts from "./SectionAccounts";
import { usePackages } from "@/hooks/get-packages";
import MpesaPagamento from "./PaymentMethod/MpesaPagamento";

interface InscreverProps {
  curso: any;
  userData: { 
    alunoId: string;
    nomeAluno: string;
    emailAluno: string;
    apelidoAluno: string;
    
  };
  preco: number;
  valorDescontado:number;
}

function InscreverForm({ curso, userData, preco ,valorDescontado}: InscreverProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const pacote = searchParams.get("pacote") ?? "";
  const resultIndicator = searchParams.get("resultIndicator") ?? "";
  const horarioSelecionado = searchParams.get("horario") ?? "Sem interacao";
  console.log("horaio selecionado", horarioSelecionado);
  let curso_Id = curso.id;
  let idAssociation = "";
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>(`${resultIndicator ? "cartao" : "mpesa"}`); // M-Pesa por padrão

  const handleFileUpload = (file: File | null) => {
    setSelectedFile(file);
  };

  const { data: pacotes } = usePackages();

  const cursoSelecionado = pacotes?.find((pkg: any) => 
    pkg.name.trim().toLowerCase() === pacote.trim().toLocaleLowerCase()
  )?.PacotesCursos?.find((pacoteCurso: any) => 
    pacoteCurso.idCurso.toString() === curso.id.toString()
  );

  if (pacote) {
    idAssociation = cursoSelecionado?.id;
  }

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   if(!resultIndicator)
    setPaymentMethod(e.target.value);
  };
  

  return (
    <div className="flex flex-col gap-1">
      <label className="mb-2 flex items-center gap-2 flex-wrap">
        Forma de Pagamento: <FormaPagamento />
      </label>
      {/* Radio Buttons para forma de pagamento */}
      <div className="flex gap-5 flex-wrap border-b-[0.9px] border-opacity-20 border-[#17387546] pb-4 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="mpesa"
            checked={!resultIndicator && paymentMethod === "mpesa"}
            onChange={handlePaymentMethodChange}
            className="form-radio"
          />
          M-Pesa
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="emola"
            checked={!resultIndicator && paymentMethod === "emola"}
            onChange={handlePaymentMethodChange}
            className="form-radio"
          />
          E-mola
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="tranferencia"
            checked={paymentMethod === "tranferencia"}
            onChange={handlePaymentMethodChange}
            className="form-radio"
          />
          Transferência
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="cartao"
            // disabled
            checked={resultIndicator ? true : paymentMethod === "cartao"}
            onChange={handlePaymentMethodChange}
            className="form-radio"
          />
          Cartão de Crédito
        </label>
      </div>

      {paymentMethod === "cartao" && <CartaoCredito 
        preco={preco}  
        pacote={pacote}
        idAssociacao={idAssociation}
        userData={userData}
        curso={curso}
        horario={horarioSelecionado}
        // valorDescontado={valorDescontado}
        
        />
      }
      {paymentMethod === "emola" && 
        <Emola
          curso={curso}
          pacote={pacote}
          userData={userData}
          idAssociacao={idAssociation}
          preco={preco}
          valorDescontado={valorDescontado}
          horario={horarioSelecionado}
        />
      }
      {paymentMethod === "tranferencia" && (
        <div className="flex flex-col gap-4">
          <SectionAccounts />
          <Transferencia
            curso={curso}
            pacote={pacote}
            idAssociacao={idAssociation}
            userData={userData}
            preco={preco}
            valorDescontado={valorDescontado}
            horario={horarioSelecionado}
          />
        </div>
      )}
      
      {/* {paymentMethod === "mpesa" && (
        <Mpesa
          preco={preco}
          pacote={pacote}
          idAssociacao={idAssociation}
          userData={userData}
          curso={curso}
        />
      )} */}
      {paymentMethod === "mpesa" && (
        <MpesaPagamento
          preco={preco}
          pacote={pacote}
          idAssociacao={idAssociation}
          userData={userData}
          curso={curso}
          horario={horarioSelecionado}
        />
      )}
    </div>
  );
}

export default InscreverForm;
