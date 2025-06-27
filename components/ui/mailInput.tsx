"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import toast from "react-hot-toast";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const MailInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false); // Estado para controlar o spinner

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simples para validar e-mail
      return emailRegex.test(email);
    };

    const handleSubscribe = async () => {
      if (!email) {
        toast.error("Por favor, insira um e-mail.");
        return;
      }

      if (!validateEmail(email)) {
        toast.error("Por favor, insira um e-mail válido.");
        return;
      }

      setIsLoading(true); // Ativa o spinner

      try {
        const response = await fetch("/api/sendEmail/subscricao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assunto: "Subscrição para Novidades",
            email,
            mensagem: "Gostaria de receber novidades.",
          }),
        });

        if (response.ok) {
          toast.success("Email enviado com sucesso!");
          setEmail(""); // Limpa o campo de entrada
        } else {
          toast.error("Erro ao enviar o e-mail. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Erro ao enviar o e-mail.");
      } finally {
        setIsLoading(false); // Desativa o spinner
      }
    };

    return (
      <div className="relative">
       <input
  type={type || "email"}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className={cn(
    "flex h-10 w-full items-center place p-4 py-2 pr-32 rounded-l-full border border-border bg-background text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  placeholder="Coloque o seu Email"
  ref={ref}
  {...props}
  disabled={isLoading} // Desativa o input enquanto está carregando
/>

<Button
  onClick={handleSubscribe}
  className="absolute w-auto min-w-[120px] h-9 px-4 inset-y-0 right-[2px] border-none text-xs rounded-none top-1/2 transform -translate-y-1/2 cursor-pointer bg-primary text-background"
  disabled={isLoading} // Desativa o botão enquanto está carregando
>
  {isLoading ? (
    <svg
      className="animate-spin h-5 w-5 text-white mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ) : (
    "Subscrever-se"
  )}
</Button>

      </div>
    );
  }
);

MailInput.displayName = "MailInput";

export { MailInput };
