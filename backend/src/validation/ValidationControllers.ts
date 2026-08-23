import { z } from "zod"

export const loginUser = z.object({
    user: z.string().min(2),
    password: z.string().min(6)
})

export const signUpUser = z.object({
    user: z.string().min(2),
    password: z.string().min(6),
    email: z.email()
})
