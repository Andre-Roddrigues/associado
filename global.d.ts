// global.d.ts
interface CheckoutInterface {
    configure: (config: any) => void;
    showLightbox: () => void;
    hideLightbox: () => void;
  }
  
  interface Window {
    Checkout: CheckoutInterface;
  }
  interface Window {
    Checkout: {
      configure: (config: CheckoutConfig) => void;
      showLightbox: () => void;
      hideLightbox: () => void;
    };
  }
  