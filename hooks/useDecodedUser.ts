"use client";

import { UserSession } from "@/components/types/types";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export function useDecodedUser() {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const token = Cookies.get("session");
  
    if (token) {
      try {
        const decoded = decodeJwt(token) as UserSession;
         setUser(decoded);
         
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);


  return user;
}
