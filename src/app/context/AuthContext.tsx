// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiServiceCall from "../service/apiServiceCall";
import { toast } from "sonner";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  source: string;
  is_active: boolean;
  profile: any;
};

type AuthContextType = {
  user: User | null;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

type LoginInput = {
  email_or_username: string;
  password: string;
};

type RegisterInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};

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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

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
      router.push("/");
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

      localStorage.setItem("access", res?.data?.access);
      localStorage.setItem("refresh", res?.data?.refresh);
      localStorage.setItem("user", JSON.stringify(res?.data?.user_data));
      setUser(res?.data?.user_data);
      toast.success(res?.message);
      router.push("/activate"); // Optional
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
