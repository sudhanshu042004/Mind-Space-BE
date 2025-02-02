import { z } from "zod";

export const SignupZod = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(20).nonempty(),
})

export const UserZod = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
})

export const LoginZod = z.object({
  email: z.string().nonempty(),
  password: z.string().min(8).max(20).nonempty(),
})

export type SignupType = z.infer<typeof SignupZod>
export type LoginType = z.infer<typeof LoginZod>
