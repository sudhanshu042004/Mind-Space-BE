import { z } from "zod";

export const SignupZod = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(20).nonempty(),
})

export type SignupType = z.infer<typeof SignupZod>
