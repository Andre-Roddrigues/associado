"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, User, Settings, Book, BookA, DoorClosed } from "lucide-react";
import Image from "next/image";
import logo from "@/public/images/icon.ico";
import { navItems } from "./navbarItems";
import { SidebarButtonSheet as SidebarButton } from "../ui/sidebar-buttons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../LogoutButton";

interface props {
  status: string;
}
function MenuMobile({ status }: props) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <Menu className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="">
        <SheetHeader className="pt-[2vh]">
          <div className="gap-2.5 hidden">
            <Link href={"/"}>
              <Image
                src={logo}
                width={35}
                height={35}
                alt="Logotipo da Instituicao - Unitec"
                className="bg-[#030B72] rounded-[35%]"
              />
            </Link>

            <div
              className={`flex flex-col justify-start items-start w-full gap-0`}
            >
              <p className="font-bold text-background">Unitec Academy</p>
              <p className="font-normal w-full flex justify-start p-0 text-xs text-muted-foreground">
                Instituto de Formação Profissional
              </p>
            </div>
          </div>
        </SheetHeader>
        <SheetTitle className="text-base font-semibold mt-8">Menu</SheetTitle>

        <div className="flex flex-col gap-3">
          <Link
            href={"/registro"}
            className={`${status !== "unauthenticated" ? "hidden" : ""}`}
          >
            <SidebarButton className="w-fit px-0 py-1 mt-4 hover:bg-transparent bg-transparent flex items-start ">
              <Button
                variant={"outline"}
                className="ml-0 dark:text-accent-foreground text-muted-foreground h-8 w-32"
              >
                Registar
              </Button>
            </SidebarButton>
          </Link>
          <Link
            href="/login"
            className={`${status !== "unauthenticated" ? "hidden" : ""}`}
          >
            <SidebarButton className="w-fit px-0 py-1 hover:bg-transparent bg-transparent flex items-start ">
              <Button
                variant={"outline"}
                className="ml-0 dark:text-accent-foreground text-muted-foreground h-8 w-32"
              >
                Entrar
              </Button>
            </SidebarButton>
          </Link>
          <Button
            variant={"outline"}
            className={`mt-3 dark:text-accent-foreground text-muted-foreground h-8 w-full flex items-center justify-between ${
              status !== "unauthenticated" ? "" : "hidden"
            }`}
            onClick={toggleProfileMenu}
          >
            Meu Perfil
            <span
              className={`ml-2 transition-transform ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </Button>

          {isProfileOpen && (
            <ul className="space-y-6 mt-2 text-muted-foreground ml- border-b pl-2 border-primary">
              <li>
                <Link href="/user/perfil">
                  <SidebarButton
                    className={`text-sm h-10 ${
                      pathname === "/user/perfil" ? "shadow-sm" : ""
                    }`}
                    variant={
                      pathname === "/user/perfil" ? "secondary" : "ghost"
                    }
                  >
                    {" "}
                    Meu Perfil
                  </SidebarButton>
                </Link>
              </li>
              <li>
                <Link href="/user/cursos">
                  <SidebarButton
                    className={`text-sm h-10 ${
                      pathname === "/user/cursos" ? "shadow-sm" : ""
                    }`}
                    variant={
                      pathname === "/user/cursos" ? "secondary" : "ghost"
                    }
                  >
                    Meus Cursos
                  </SidebarButton>
                </Link>
              </li>
              <li>
                <Link href="/user/associado">
                  <SidebarButton
                    className={`text-sm h-10 ${
                      pathname === "/user/associado" ? "shadow-sm" : ""
                    }`}
                    variant={
                      pathname === "/user/associado" ? "secondary" : "ghost"
                    }
                  >
                    Associado
                  </SidebarButton>
                </Link>
              </li>
              <li>
                <Link href="/user/mudar-senha">
                  <SidebarButton
                    className={`text-sm h-10 ${
                      pathname === "/user/definicoes" ? "shadow-sm" : ""
                    }`}
                    variant={
                      pathname === "/user/definicoes" ? "secondary" : "ghost"
                    }
                  >
                    Mudar Senha
                  </SidebarButton>
                </Link>
              </li>

              <li>
                <LogoutButton>
                  <div className="flex items-center gap-3 p-3 px-4 rounded-lg hover:bg-muted  transition-colors cursor-pointer">
                    Sair
                  </div>
                </LogoutButton>
              </li>
            </ul>
          )}
        </div>

        <nav className="flex flex-col gap-2 mt-8 text-muted-foreground">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <SidebarButton
                className={`text-sm h-10 ${
                  pathname === item.href ? "shadow-sm" : ""
                }`}
                variant={pathname === item.href ? "secondary" : "ghost"}
              >
                {item.label}
              </SidebarButton>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MenuMobile;
