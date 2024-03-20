import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinSchema, signupSchema } from "@prathyarthi/common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = signupSchema.safeParse(body)

    if (!success) {
        return c.json({
            success: false,
            message: "Invalid inputs"
        })
    }
    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET)

        return c.json({
            success: true,
            user,
            token
        })
    } catch (error) {
        return c.json({
            success: false,
            message: "Couldn't create user"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signinSchema.safeParse(body)

    if (!success) {
        return c.json({
            success: false,
            message: "Invalid inputs"
        })
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if (!userExists) {
        return c.json({
            success: false,
            message: "Couldn't find user"
        })
    }

    const token = await sign({
        id: userExists.id
    }, c.env.JWT_SECRET)

    return c.json({
        success: true,
        user: userExists,
        token
    })
})

