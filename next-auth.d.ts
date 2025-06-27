import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			nome: string
			apelido: string
            contacto: string
            email: string
            curso: []
		}
	}
}

interface CheckoutInterface {
	configure: (config: any) => void;
	showLightbox: () => void;
	hideLightbox: () => void;
  }
  
  interface Window {
	Checkout: CheckoutInterface;
  }