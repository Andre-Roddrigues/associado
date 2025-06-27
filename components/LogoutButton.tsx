"use client";
import { logout } from "@/app/(auth)/login/auth-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LogoutButtonProps {
  children: ReactNode;
  // Função de callback opcional
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2 items-center text-destructive ">
            <Info className="text-destructive" /> Sair?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Está prestes a terminar a sessão na sua conta.
            <br />
            Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="z-[100]">
          <AlertDialogCancel className="px-6 h-8">Não</AlertDialogCancel>
          <AlertDialogAction
            className="px-6 h-8 "
            data-action="logout"
            onClick={(e) => {
              e.stopPropagation(); // Impede que o evento chegue ao dropdown
              handleLogout();
            }}
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
