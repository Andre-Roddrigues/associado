"use server"
import { routes } from "@/config/routes";
import axios from "axios";

function gerarIdUnico() {
    const numeros = Math.floor(1000 + Math.random() * 9000); // 4 dígitos entre 1000 e 9999
    const letras = Array.from({ length: 5 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
    const sufixo = Math.floor(10 + Math.random() * 90);
    return `COM${numeros}${letras}${sufixo}`;
}
function gerarIdUnicoRef() {
    // Prefixo fixo "OEU3"
    const prefixo = "OEU";

    // Gera uma parte aleatória de 10 caracteres (letras e números)
    const parteAleatoria = Array.from({ length: 10 }, () => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    return `${prefixo}${parteAleatoria}`;
}
const referencia = gerarIdUnicoRef();

const idGerado = gerarIdUnico();

export async function pagamentoMpesa(phoneNumber: string, amount: number) {
  

    const headers = {
        Host: 'api.vm.co.mz',
        'Content-Type': 'application/json',
        Authorization: process.env.MPESA_PAYMENT_TOKEN,
        Origin: '*',
    };
    const dados = {
        input_ThirdPartyReference: idGerado,
        input_Amount: `${amount}`,
        input_CustomerMSISDN: `258${phoneNumber}`,
        input_ServiceProviderCode: process.env.MPESA_SERVICE_PROVIDER_CODE,
        input_TransactionReference: referencia,
    };

    try {
        const response = await axios.post(routes.mpesa_pagamento, dados, { headers: headers });
         
        console.log(" Pagamento :", response.data)
        console.log(" Status do pagamento :", response.status);
        const status = response.status;

        switch (status) {
            case 201:
                console.log(" Pagamento com sucesso" ) 
                return { success: true, message: 'Pagamento realizado com sucesso!' };

            case 422:
                return { success: false, message: 'Saldo insuficiente.'  };

            case 400:
            case 401:
                console.log(`Status resposta pagamento: ${status}`);
                return { success: false, message: 'Erro ao processar o pagamento. Verifique o PIN.' };

            default:
                console.log(`Status inesperado: ${status}`);
                return { success: false, message: 'Erro ao processar o pagamento.\nTente novamente.'};
        }

    } catch (error) {
        console.log('Erro ao processar pagamento:', error);
        return { success: false, message: 'Erro ao processar pagamento.\nTente novamente...' };

    }
}