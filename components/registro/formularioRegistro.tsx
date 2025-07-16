"use client";
import { useRouter } from "next/navigation"; 
import { useState, FormEvent } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import { registerInstructor } from "../formadorPage/actionsFormador/registar-actions";
import toast from "react-hot-toast";
import ModalTermos from "@/app/(auth)/login/ModalTermis";
import { motion } from "framer-motion";
import Link from "next/link";

type FormData = {
  nomeCompleto: string;
  contacto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function AuthPanel() {
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    contacto: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [shakePasswords, setShakePasswords] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "contacto" && (!/^\d*$/.test(value) || value.length > 9)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };


const router = useRouter(); 

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setFormErrors({});
  setShakePasswords(false);

  const errors: Partial<FormData> = {};

  if (!formData.nomeCompleto.trim()) errors.nomeCompleto = "erro";
  if (!formData.contacto.match(/^\d{9}$/)) errors.contacto = "erro";
  if (!formData.email.includes("@")) errors.email = "erro";
  if (formData.senha.length < 8) errors.senha = "erro";
  if (formData.senha !== formData.confirmarSenha) {
    errors.senha = "erro";
    errors.confirmarSenha = "erro";
    setShakePasswords(true);
  }

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    setTimeout(() => setShakePasswords(false), 600);
    setIsLoading(false);
    return;
  }

  try {
    await registerInstructor({
      nomeCompleto: formData.nomeCompleto,
      email: formData.email,
      contacto: formData.contacto,
      senha: formData.senha,
    });

    toast.success("Cadastro realizado com sucesso!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
    

    setFormData({
      nomeCompleto: "",
      contacto: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    });

    // ✅ Redireciona após o sucesso
    router.push("/login");
  } catch {
    toast.error("Erro ao registrar.");
  } finally {
    setIsLoading(false);
  }
};


  const password = formData.senha;
  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const passwordRequirements = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordColors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];
  const strengthColor =
    passwordScore >= 4 ? passwordColors[2] : passwordScore >= 2 ? passwordColors[1] : passwordColors[0];

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 p-4">
      <div className="relative w-full max-w-[768px] min-h-[520px] bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col items-center justify-center px-4 sm:px-8 py-4 text-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="text-blue-500" size={28} />
              <h1 className="text-2xl text-blue-500 font-bold">Unitec</h1>
            </div>

            <InputField
              type="text"
              name="nomeCompleto"
              placeholder="Nome Completo"
              icon={<User className="text-blue-400" size={18} />}
              value={formData.nomeCompleto}
              onChange={handleInputChange}
              required
              error={formErrors.nomeCompleto}
            />
            <InputField
              type="text"
              name="contacto"
              placeholder="Contacto (9 dígitos)"
              icon={<Phone className="text-blue-400" size={18} />}
              value={formData.contacto}
              onChange={handleInputChange}
              required
              error={formErrors.contacto}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              icon={<Mail className="text-blue-400" size={18} />}
              value={formData.email}
              onChange={handleInputChange}
              required
              error={formErrors.email}
            />
            <InputField
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              icon={<Lock className="text-blue-400" size={18} />}
              value={formData.senha}
              onChange={handleInputChange}
              required
              toggleIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              onToggle={() => setShowPassword((prev) => !prev)}
              error={formErrors.senha}
              shake={shakePasswords}
            />
            <InputField
              type={showConfirmPassword ? "text" : "password"}
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              icon={<Lock className="text-blue-400" size={18} />}
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              required
              toggleIcon={showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
              error={formErrors.confirmarSenha}
              shake={shakePasswords}
            />
              <div className="text-center text-sm text-gray-500">
                  Já tem conta? {""}
                  <Link href="/login"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                  >
                    Faça o Login
                  </Link>
                </div>
            {formData.senha.length > 0 && (
              <div className="w-full mt-2 h-2 bg-gray-200 rounded">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordScore / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-2 rounded ${strengthColor}`}
                />
              </div>
            )}

            <SubmitButton
              label={isLoading ? "Processando..." : "Registrar"}
              disabled={isLoading}
            />
          </form>
        </div>

        <div className="hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden">
          <div className="relative h-full w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/40 z-10" />
            <Image
              src="/images/online_class.jpg"
              alt="Background UnitecPRO"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute z-20 flex flex-col items-start px-10 text-left">
              <h1 className="text-2xl font-bold mb-2 drop-shadow-md">Registre-se na Unitec!</h1>
              <p className="text-sm mb-4 text-white/90">Crie sua conta para começar sua jornada conosco</p>
              <p className="text-sm mb-2 text-white/90">A senha deve conter:</p>
              <ul className="text-sm text-white space-y-1">
                <li className={passwordRequirements.length ? "text-green-400" : "text-white/90"}>
                  {passwordRequirements.length && "✓"} Mínimo de 8 caracteres
                </li>
                <li className={passwordRequirements.upper ? "text-green-400" : "text-white/90"}>
                  {passwordRequirements.upper && "✓"} 1 letra maiúscula
                </li>
                <li className={passwordRequirements.lower ? "text-green-400" : "text-white/90"}>
                  {passwordRequirements.lower && "✓"} 1 letra minúscula
                </li>
                <li className={passwordRequirements.number ? "text-green-400" : "text-white/90"}>
                  {passwordRequirements.number && "✓"} 1 número
                </li>
                <li className={passwordRequirements.special ? "text-green-400" : "text-white/90"}>
                  {passwordRequirements.special && "✓"} 1 caractere especial
                </li>
              </ul>
              <div className="text-sm text-white mt-4">
                <p>Ao continuar, você concorda com os</p>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="underline hover:text-blue-200"
                >
                  Termos e Condições de Uso
                </button>
              </div>
              <ModalTermos isOpen={openModal} onClose={() => setOpenModal(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  type,
  name,
  placeholder,
  icon,
  value,
  onChange,
  required,
  toggleIcon,
  onToggle,
  error,
  shake = false,
}: {
  type: string;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  toggleIcon?: React.ReactNode;
  onToggle?: () => void;
  error?: string;
  shake?: boolean;
}) => (
  <motion.div
    className="relative w-full my-3"
    animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
    transition={{ duration: 0.4 }}
  >
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full bg-gray-100 text-gray-500 rounded-lg p-3 pl-10 pr-10 text-sm transition-all ${
        error
          ? "border border-red-500 focus:outline-red-500 bg-red-50"
          : "border-none focus:outline-2 focus:outline-blue-500 focus:bg-white"
      }`}
    />
    {toggleIcon && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
      >
        {toggleIcon}
      </button>
    )}
  </motion.div>
);

const SubmitButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) => (
  <button
    type="submit"
    disabled={disabled}
    className={`w-full rounded-full bg-blue-500 px-10 py-3 text-sm font-bold uppercase text-white mt-4 hover:bg-blue-600 transition-colors ${
      disabled ? "opacity-70 cursor-not-allowed" : ""
    }`}
  >
    {label}
  </button>
);
