"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import apiServiceCall from "@/app/service/apiServiceCall";
import { ResetPasswordFormStepProps } from "@/app/interfaces";
import { resetSchema } from "@/schema";

type ResetFormData = z.infer<typeof resetSchema>;

export function ResetPasswordFormStep({
  onBack,
  onSuccess,
}: ResetPasswordFormStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      // TODO: call reset password API, e.g. await sendResetEmail(data.email);
      const res = await apiServiceCall({
        url: "/api/users/forget-password/",
        method: "POST",
        body: { email: data.email },
        endpoint: "reset",
      });
      
      toast.success("If that email exists, you’ll receive reset instructions."); // avoid leaking existence
      onSuccess?.(data.email);
    } catch (err: any) {
      toast.error("Failed to request reset. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Email"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={onBack}
          variant={"link"}
        >
          Back to Login
        </Button>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Send Reset Email
        </Button>
      </DialogFooter>
    </form>
  );
}
