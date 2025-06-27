
import Inicio from "./inicio/page";
import ParallaxProviderClient from "./providers/ParallaxProviderClient";

export default function HomePage (){
  
  
  return (
    <>
     <ParallaxProviderClient>
       <Inicio />  
     </ParallaxProviderClient>
    </>
  );
}
