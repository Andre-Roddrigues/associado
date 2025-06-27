import PerfilBancos from "./perfilBancos";
import PerfilDocumentos from "./perfilDocumentos";
import PerfilForm from "./perfilForm";
import PerfilHeader from "./perfilHeader";


const PerfilHome = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* <PerfilHeader /> */}
      
      <main className=" mx-auto px-4 py-8">
        <PerfilForm />
        <PerfilDocumentos />
        <PerfilBancos />
      </main>      
    </div>
  );
};

export default PerfilHome;