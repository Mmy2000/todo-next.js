// app/login/page.tsx
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email_or_username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login({ email_or_username, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-10 shadow rounded-xl bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Login</h2>
      <Input
        type="text"
        placeholder="Email or Username"
        value={email_or_username}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button
        variant="outline"
        onClick={handleLogin}
        disabled={loading}
        className="w-full"
        isLoading={loading}
        loadingText="Logging in"
      >
        Login
      </Button>
    </div>
  );
}
