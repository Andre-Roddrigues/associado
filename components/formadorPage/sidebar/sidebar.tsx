
"use client"
import {
  LayoutDashboard,
  BookOpenText,
  FileText,
  User,
  LockKeyhole,
  DoorClosed,
  Landmark,
} from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton"; 
import SidebarFormador from "./SidebarFormador";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-72 bg-gradient-to-r from-[#283E66] to-[#152136] shadow-lg border-r border-gray-200 p-6 flex-col justify-between min-h-screen">
      <div>
        <ul className="space-y-2">
          <SidebarFormador href="/formador/painel" label="Dashboard" Icon={LayoutDashboard} />
          <SidebarFormador href="/formador/cursos" label="Meus Cursos" Icon={BookOpenText} />
          <SidebarFormador href="/formador/ebooks" label="Meus Ebooks" Icon={FileText} />
          <SidebarFormador href="/formador/ganhos" label="Meus Ganhos" Icon={Landmark} />
          <SidebarFormador href="/formador/perfil" label="Meu Perfil" Icon={User} />
        </ul>
      </div>

      {/* LOGOUT */}
      {/* <div className="mt-8">
        <LogoutButton>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-100 text-red-600 transition-colors cursor-pointer">
            <DoorClosed className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </div>
        </LogoutButton>
      </div> */}
    </div>
  );
};

export default Sidebar;
