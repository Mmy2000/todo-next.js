export interface ITodo {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  created_at?: Date;
}

export interface LoginFormStepProps {
  onForgotPassword: () => void;
  onSuccess?: () => void;
}

export interface ResetPasswordFormStepProps {
  onBack: () => void;
  onSuccess?: (email: string) => void;
}

export interface ResetPasswordVerifyStepProps {
  email: string;
  onBack: () => void;
  onSuccess?: () => void;
}