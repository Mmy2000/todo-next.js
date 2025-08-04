import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .max(80, {
      message: "Short description must not be longer than 80 characters.",
    })
    .optional(),
  status: z.string().min(4, {
      message: "Status must be at least 4 characters.",
    })
    .max(30, {
      message: "Status must not be longer than 30 characters.",
    }),
  priority: z.string().min(3, {
      message: "Priority must be at least 3 characters.",
    })
    .max(30, {
      message: "Priority must not be longer than 30 characters.",
    }),
});

export const loginSchema = z.object({
  email_or_username: z.string().min(3, "Email or Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

export type TodoFormValues = z.infer<typeof todoFormSchema>;