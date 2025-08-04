"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import Link from "next/link";
import { LoginFormStepProps } from "@/app/interfaces";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginFormStep({ onForgotPassword, onSuccess }: LoginFormStepProps) {
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Email or Username"
          {...register("email_or_username")}
          autoComplete="username"
        />
        {errors.email_or_username && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email_or_username.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
        variant={"link"}
          type="button"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </Button>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button
          isLoading={loading}
          loadingText="Logging in"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </DialogFooter>
    </form>
  );
}
