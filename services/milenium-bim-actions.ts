export async function pagamentoMilleniumBim(amount:number, returnUrl:string ){
    try {
    const response = await fetch('/api/millenniumbim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        returnUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
      
    }
    const responseData = await response.json();
    
      console.log("Full Response from API:", responseData);

      // Se você quiser acessar o sessionId diretamente
      const { sessionId, successIndicator } = responseData;
      console.log("SESSION ID:", sessionId);
      console.log("SUCESS INDICATOR:", successIndicator);
      return {sucess: true, data: responseData} 

}catch (error) {
    console.error('Checkout failed:', error);
    return {sucess: false} 
  } 
}