"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const useAuthRedirect = (redirectIfLogged = false) => {
   const router = useRouter();
   const { isAuthenticated } = useAuth();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (isAuthenticated === null) return;

      if (redirectIfLogged && isAuthenticated) {
         router.push("/user");
      }

      if (!redirectIfLogged && !isAuthenticated) {
         router.push("/login");
      }

      setLoading(false);
   }, [isAuthenticated, redirectIfLogged, router]);

   return loading;
};
