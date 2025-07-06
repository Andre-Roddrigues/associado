"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}

export default function SidebarFormador({ href, label, Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <>
      {/* Versão Desktop */}
      <li className="hidden md:flex">
        <Link
          href={href}
          className={`flex items-center gap-4 p-3 rounded-lg transition-colors hover:text-blue-400 hover:px-4
            ${isActive ? "bg-white text-primary font-extrabold shadow-xl px-4" : "text-white hover:bg-white"}`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{label}</span>
        </Link>
      </li>

      {/* Versão Mobile */}
      <li className="md:hidden flex justify-center">
        <Link
          href={href}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors 
            ${isActive ? "bg-white text-primary font-extrabold shadow-xl" : "text-white hover:bg-white"}`}
        >
          <Icon className="w-6 h-6 mb-1" />
          <span className="text-xs">{label}</span>
        </Link>
      </li>
    </>
  );
}
