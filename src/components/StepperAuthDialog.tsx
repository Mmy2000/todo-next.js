"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginFormStep } from "./LoginFormStep";
import { ResetPasswordFormStep } from "./ResetPasswordFormStep";
import { Step } from "@/app/types";
import { ResetPasswordVerifyStep } from "./ResetPasswordVerifyStep";
import { toast } from "sonner";

export function StepperAuthDialog() {
  const [step, setStep] = useState<Step>("login");
  const [resetEmail, setResetEmail] = useState("");
  const goToReset = () => setStep("reset");
  const goToLogin = () => setStep("login");

  const title = step === "login" ? "Login" : "Reset Password";
  const description =
    step === "login"
      ? "Access your account"
      : step === "reset"
      ? "Enter your email to receive password reset instructions"
      : "Enter your OTP and reset your password";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Login</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {step === "login" && (
          <LoginFormStep
            onForgotPassword={goToReset}
            onSuccess={() => {
              /* maybe close or redirect */
            }}
          />
        )}

        {step === "reset" && (
          <ResetPasswordFormStep
            onBack={goToLogin}
            onSuccess={(email) => {
              setResetEmail(email);
              setStep("verify");
            }}
          />
        )}
        {step === "verify" && (
          <ResetPasswordVerifyStep
            email={resetEmail}
            onBack={() => setStep("reset")}
            onSuccess={() => {
              toast.success("Password reset successfully. You can now log in.");
              setStep("login");
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
