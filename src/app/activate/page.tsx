"use client";

import React, { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // for getting query/email
import apiServiceCall from "../service/apiServiceCall";
import { toast } from "sonner";

const RESEND_TIMEOUT = 30;

const page = () => {
  const router = useRouter();
  const [otpValue, setOtpValue] = useState(""); // OTP value
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [resendTimeout, setResendTimeout] = useState(0);
  const [canResend, setCanResend] = useState(true);


   useEffect(() => {
     let interval: NodeJS.Timeout;
     if (resendTimeout > 0) {
       interval = setInterval(() => {
         setResendTimeout((prev) => prev - 1);
       }, 1000);
     } else {
       setCanResend(true);
     }
     return () => clearInterval(interval);
   }, [resendTimeout]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("activationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Handle missing email (optional)
    }
  }, []);

  const handleResendOtp = async () => {
    if (!canResend) return;    

    setLoadingResend(true);
    try {
      const response = await apiServiceCall({
        url: "/api/users/resend_code/",
        method: "POST",
        body: { email},
        endpoint: "resend_code",
      });
      toast.success(
        response?.message || "A new OTP has been sent to your email."
      );

      setResendTimeout(RESEND_TIMEOUT);
      setCanResend(false);
    } catch(error) {
      console.log(error);
      
    } finally {
      setLoadingResend(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || otpValue.length !== 4) {
      setErrorMsg(
        "Please enter a valid 4-digit code and make sure email is present."
      );
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await apiServiceCall({
        url: "/api/users/activate/",
        method: "POST",
        body: { email, otp: otpValue },
        endpoint: "activate",
      });
      // Handle success
      toast.success("Activation successful, You can login now.");
      console.log("Activation successful:", response.data);
      router.push("/"); // redirect after activation
    } catch (err: any) {
      console.error("Activation failed:", err);
      setErrorMsg(
        err?.response?.data?.message || "Activation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="flex justify-center">
      <div className="w-full max-w-md p-8 space-y-6 my-12 rounded-2xl shadow-xl dark:bg-zinc-900 bg-zinc-50">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-center">
            Activate Your Account
          </h1>
          <p className="text-center">
            Please enter the verification code sent to:
            <br />
            <span className="font-medium text-green-600">{email}</span>
          </p>
        </div>

        {errorMsg && (
          <p className="text-center text-red-500 text-sm">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otpValue}
              onChange={(val) => setOtpValue(val)}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <Button className="w-3/4" type="submit" disabled={loading} loadingText="Varifying" isLoading={loading}>
              Verify Account
            </Button>
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              className="text-sm"
              onClick={handleResendOtp}
              disabled={!canResend || loadingResend}
              loadingText="Resending"
              isLoading={loadingResend}
            >
              {resendTimeout > 0 ? (
                <span>Resend code in {resendTimeout}s</span>
              ) : (
                "Resend verification code"
              )}
            </Button>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
