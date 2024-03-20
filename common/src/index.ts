import zod from "zod"

export const signupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
})

export type SignupSchema = zod.infer<typeof signupSchema>

export const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

export type SigninSchema = zod.infer<typeof signinSchema>

export const createBlogSchema = zod.object({
    title: zod.string(),
    content: zod.string().min(8),
})

export type CreateBlogSchema = zod.infer<typeof createBlogSchema>

export const updateBlogSchema = zod.object({
    title: zod.string().optional(),
    content: zod.string().min(8).optional(),
    id: zod.number()
})

export type UpdateBlogSchema = zod.infer<typeof updateBlogSchema>




