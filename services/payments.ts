import axios from 'axios';
import apiClient from '@/lib/axios-config-clientResquests';
import { routes } from '@/config/routes';

export const processarPagamentoMpesa = async (mpesaNumber: string, preco: number) => {
  const dados = {
    amount: preco,
    phoneNumber: mpesaNumber,
  };

  try {
    const response = await axios.post("/api/paymentmpesa", dados);
    console.log("Resposta: ",response.data)
    if (response.data.status === 201) {
      return { success: true, message: 'Pagamento realizado com sucesso!' };
    } else if (response.data.status === 422) {
      return { success: false, message: 'Saldo insuficiente.' };
    }else if (response.data.status === 400 || response.status === 401){
      console.log('Status resposta pagamento: ' + response.data.status)
      return { success: false, message: 'Erro ao processar o pagamento. Verifique o PIN.' };
    } else {
      console.log( "Status: " + response.data.status) 
      return { success: false, message: 'Erro ao processar o pagamento.', data: response };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message || 'Erro ao processar pagamento.' };
    }
    return { success: false, message: 'Erro de conexão. Verifique sua internet.' };
  }
};

export const registerPayment = async (formData: FormData) => {
  try {
    const response = await apiClient.post(routes.registarPagamento, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if(response.status === 200) {      
      return {sucess:true, message: "Curso registado com sucesso"};
    }else if(response.status === 400){
      return {sucess:false, message: "ERRO!!! Já está inscrito neste curso!"};
    }
   
  } catch (error:any) {
    console.error('Erro ao registrar pagamento:', error);
    return { sucess:false, message: "Erro ao carregar curso "};
  }
};
