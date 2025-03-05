import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(30, "Username must be no more than 30 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*()]/,
      "Password must contain at least one special character"
    ),
});

export const LoginSchema = UserSchema.omit({ username: true });

export type UserSchema = z.infer<typeof UserSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
