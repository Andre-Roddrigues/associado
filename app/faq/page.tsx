"use client";

import { useState, FormEvent } from "react";
import { LogIn, UserPlus, Mail, Lock, User, HelpCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function AuthPanel() {
  const [activePanel, setActivePanel] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(activePanel === "signup" ? "Sign Up Data:" : "Sign In Data:", formData);
      if (activePanel === "signup") setActivePanel("signin"); // Switch to sign in after registration
    } catch (err) {
      setError(activePanel === "signup" 
        ? "Falha no registro. Tente novamente." 
        : "Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-600 p-4">
      <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-[768px] min-h-[520px] overflow-hidden ${activePanel === "signup" ? "right-panel-active" : ""}`}>
        
        {/* Sign In Form (Left Side by Default) */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ease-in-out ${activePanel === "signup" ? "translate-x-full opacity-0" : "opacity-100"}`}>
          <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <LogIn className="text-rose-500" size={28} />
              <h1 className="text-2xl font-bold">Entrar</h1>
            </div>
            
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              icon={<Mail className="text-gray-400" size={18} />}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="password"
              name="password"
              placeholder="Senha"
              icon={<Lock className="text-gray-400" size={18} />}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            
            <a href="#" className="flex items-center gap-1 text-xs text-gray-500 my-2 hover:text-rose-500">
              <HelpCircle size={14} /> Esqueceu sua senha?
            </a>
            
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            <SubmitButton 
              label={isLoading ? "Processando..." : "Entrar"} 
              disabled={isLoading}
            />
          </form>
        </div>

        {/* Sign Up Form (Right Side) */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ease-in-out ${activePanel === "signup" ? "translate-x-full opacity-100" : "opacity-0"}`}>
          <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <UserPlus className="text-rose-500" size={28} />
              <h1 className="text-2xl font-bold">Registrar</h1>
            </div>
            
            <InputField
              type="text"
              name="name"
              placeholder="Nome"
              icon={<User className="text-gray-400" size={18} />}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              icon={<Mail className="text-gray-400" size={18} />}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="password"
              name="password"
              placeholder="Senha"
              icon={<Lock className="text-gray-400" size={18} />}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            <SubmitButton 
              label={isLoading ? "Processando..." : "Registrar"} 
              disabled={isLoading}
            />
          </form>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-10 ${activePanel === "signup" ? "-translate-x-full" : ""}`}>
          <div className={`relative h-full w-[200%] bg-gradient-to-r from-rose-500 to-pink-600 text-white ${activePanel === "signup" ? "translate-x-1/2" : ""}`}>
            {/* Sign In Overlay */}
            <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 transition-transform duration-500 ease-in-out ${activePanel === "signup" ? "translate-x-0" : "-translate-x-1/5"}`}>
              <h1 className="text-2xl font-bold mb-4">Bem-vindo de volta!</h1>
              <p className="text-sm mb-6 text-center">Entre com seus dados para acessar sua conta</p>
              <OverlayButton 
                onClick={() => setActivePanel("signin")}
                label="Entrar"
              />
            </div>
            
            {/* Sign Up Overlay */}
            <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 transition-transform duration-500 ease-in-out ${activePanel === "signup" ? "translate-x-1/5" : "translate-x-0"}`}>
              <h1 className="text-2xl font-bold mb-4">Olá, Amigo!</h1>
              <p className="text-sm mb-6 text-center">Registre-se para começar sua jornada conosco</p>
              <OverlayButton 
                onClick={() => setActivePanel("signup")}
                label="Registrar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const InputField = ({ type, name, placeholder, icon, value, onChange, required }: { 
  type: string; 
  name: string; 
  placeholder: string; 
  icon: React.ReactNode; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
}) => (
  <div className="relative w-full my-3">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
      {icon}
    </span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-gray-100 border-none rounded-lg p-3 pl-10 text-sm focus:outline-2 focus:outline-rose-500 focus:bg-white transition-all"
    />
  </div>
);

const SubmitButton = ({ label, disabled }: { label: string; disabled?: boolean }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`w-full rounded-full bg-rose-500 px-10 py-3 text-sm font-bold uppercase text-white mt-4 hover:bg-rose-600 transition-colors ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
  >
    {label}
  </button>
);

const OverlayButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="rounded-full border border-white bg-transparent px-10 py-3 text-sm font-bold uppercase text-white hover:bg-white/10 transition-colors"
  >
    {label}
  </button>
);