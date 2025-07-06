"use client";

import { useState, FormEvent } from "react";
import { UserPlus, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { registerInstructor } from "../formadorPage/actionsFormador/registar-actions";
import toast, { Toaster } from "react-hot-toast";

const passwordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "contacto" && (!/^\d*$/.test(value) || value.length > 9))
      return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
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
      setFormData({
        nomeCompleto: "",
        contacto: "",
        email: "",
        senha: "",
        confirmarSenha: "",
      });
    } catch (err: any) {
        toast.error(err.message || "Falha no registro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordScore = passwordStrength(formData.senha);
  const passwordColors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 p-4">
      <div className="relative w-full max-w-[768px] min-h-[520px] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Form Container - Mostra imagem apenas em telas maiores */}
        <div className="absolute top-0 left-0 h-full w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col items-center justify-center px-4 sm:px-8 py-4 text-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="text-blue-500" size={28} />
              <h1 className="text-2xl text-blue-500 font-bold">UnitecPRO</h1>
            </div>

            <InputField
              type="text"
              name="nomeCompleto"
              placeholder="Nome Completo"
              icon={<User className="text-blue-400" size={18} />}
              value={formData.nomeCompleto}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="text"
              name="contacto"
              placeholder="Contacto (9 dígitos)"
              icon={<Phone className="text-blue-400" size={18} />}
              value={formData.contacto}
              onChange={handleInputChange}
              required
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              icon={<Mail className="text-blue-400" size={18} />}
              value={formData.email}
              onChange={handleInputChange}
              required
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
            />
            <InputField
              type={showConfirmPassword ? "text" : "password"}
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              icon={<Lock className="text-blue-400" size={18} />}
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              required
              toggleIcon={
                showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />
              }
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
            />

            {formData.senha.length > 0 && (
              <div className="w-full mt-2 h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded transition-all duration-300 ${
                    passwordScore >= 4
                      ? passwordColors[2]
                      : passwordScore >= 2
                      ? passwordColors[1]
                      : passwordColors[0]
                  }`}
                  style={{ width: `${(passwordScore / 4) * 100}%` }}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-emerald-600 text-sm mt-2">{success}</p>}

            <SubmitButton
              label={isLoading ? "Processando..." : "Registrar"}
              disabled={isLoading}
            />
          </form>
        </div>

        {/* Image Container - Escondido em telas pequenas */}
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
            <div className="absolute z-20 flex flex-col items-center px-10 text-center">
              <h1 className="text-2xl font-bold mb-4 drop-shadow-md">
                Registre-se na UnitecPRO!
              </h1>
              <p className="text-sm mb-6 text-white/90 drop-shadow-md">
                Crie sua conta para começar sua jornada conosco
              </p>
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
      className="w-full bg-gray-100 border-none text-gray-500 rounded-lg p-3 pl-10 pr-10 text-sm focus:outline-2 focus:outline-blue-500 focus:bg-white transition-all"
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
  </div>
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