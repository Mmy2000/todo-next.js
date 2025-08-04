// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiServiceCall from "../service/apiServiceCall";
import { toast } from "sonner";
import { AuthContextType, LoginInput, RegisterInput, User } from "../types";


const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async ({ email_or_username, password }: LoginInput) => {
    setLoading(true);
    try {
      const res = await apiServiceCall({
        url: "/api/users/login/",
        method: "POST",
        body: { email_or_username, password },
        endpoint: "login",
      });

      localStorage.setItem("access", res?.data?.access);
      localStorage.setItem("refresh", res?.data?.refresh);
      localStorage.setItem("user", JSON.stringify(res?.data?.user_data));
      setUser(res?.data?.user_data);
      toast.success(res?.message);
      router.push("/profile");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const res = await apiServiceCall({
        url: "/api/users/register/",
        method: "POST",
        body: data,
        endpoint: "register",
      });      
      localStorage.setItem("activationEmail", res?.data?.user_data?.email);
      toast.success(res?.message);
      router.push("/activate"); // Optional
    } catch (err) {
      toast.error((err as any)?.data.email || "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

   useEffect(() => {
     const savedUser = localStorage.getItem("user");
     if (savedUser) {
      setUser(JSON.parse(savedUser));
     };
   }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
