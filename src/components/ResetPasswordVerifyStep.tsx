"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import apiServiceCall from "@/app/service/apiServiceCall";
import { ResetPasswordVerifyStepProps } from "@/app/interfaces";
import { verifySchema } from "@/schema";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

type VerifyFormData = z.infer<typeof verifySchema>;

export function ResetPasswordVerifyStep({
  email,
  onBack,
  onSuccess,
}: ResetPasswordVerifyStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });


  const [otpValue, setOtpValue] = useState("");

  const onSubmit = async (data: VerifyFormData) => {
    try {
      const res = await apiServiceCall({
        url: "/api/users/reset_password/",
        method: "POST",
        body: {
          email,
          otp: data.otp,
          new_password: data.new_password,
        },
        endpoint: "reset-confirm",
      });
      onSuccess?.();
    } catch (err: any) {
      toast.error("Failed to reset password. Check your OTP and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="flex justify-center gap-2">
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otpValue}
            onChange={(val) => {
              setOtpValue(val);
              setValue("otp", val);
            }}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="New Password"
          {...register("new_password")}
        />
        {errors.new_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.new_password.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="button" onClick={onBack} variant={"link"}>
          Back
        </Button>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Reset Password
        </Button>
      </DialogFooter>
    </form>
  );
}
