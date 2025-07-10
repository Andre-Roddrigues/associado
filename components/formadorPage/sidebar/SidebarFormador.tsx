"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useTransition } from "react";
import { Loader } from "lucide-react";

interface SidebarItemProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}

export default function SidebarFormador({ href, label, Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const [isPending, startTransition] = useTransition();

  return (
    <>
      {/* Versão Desktop */}
      <li className="hidden sticky top-0 md:flex z-10">
        <Link
          href={href}
          prefetch={false}
          onClick={() => startTransition(() => {})}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:text-blue-400 hover:px-4
            ${isActive ? "bg-white text-primary font-extrabold shadow-xl px-4" : "text-white hover:bg-white"}`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{label}</span>
          {isPending && isActive && (
            <Loader className="w-4 h-4 animate-spin ml-auto text-blue-500" />
          )}
        </Link>
      </li>

      {/* Versão Mobile */}
      <li className="md:hidden flex justify-center sticky top-0 z-10 ">
        <Link
          href={href}
          prefetch={false}
          onClick={() => startTransition(() => {})}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
            ${isActive ? "bg-white text-primary font-extrabold shadow-xl" : "text-white hover:bg-white"}`}
        >
          <Icon className="w-6 h-6 mb-1" />
          <span className="text-xs">{label}</span>
          {isPending && isActive && (
            <Loader className="w-4 h-4 animate-spin mt-1 text-blue-500" />
          )}
        </Link>
      </li>
    </>
  );
}
