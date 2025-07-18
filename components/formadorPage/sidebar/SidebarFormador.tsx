"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface SidebarItemProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}

export default function SidebarFormador({ href, label, Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isActive) return;
    setIsLoading(true);
    router.push(href);
  };

  // Parar o loading quando a rota mudar (pathname atualizar)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop */}
      <li className="hidden sticky top-0 md:flex z-10">
        <Link
          href={href}
          prefetch={false}
          onClick={handleClick}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:text-blue-400 hover:px-4
            ${isActive ? "bg-white text-primary font-extrabold shadow-xl px-4" : "text-white hover:bg-white"}`}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin text-blue-500" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
          <span className="font-medium">{label}</span>
        </Link>
      </li>

      {/* Mobile */}
      <li className="md:hidden flex justify-center sticky top-0 z-10">
        <Link
          href={href}
          prefetch={false}
          onClick={handleClick}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
            ${isActive ? "bg-white text-primary font-extrabold shadow-xl" : "text-white hover:bg-white"}`}
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin text-blue-500 mb-1" />
          ) : (
            <Icon className="w-6 h-6 mb-1" />
          )}
          <span className="text-xs">{label}</span>
        </Link>
      </li>
    </>
  );
}
