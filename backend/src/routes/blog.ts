import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || ""
    const token = header?.split(' ')[1]

    const verifyToken = await verify(token, c.env.JWT_SECRET)

    if (verifyToken) {
        c.set("userId", verifyToken.id)
        next()
    }
    else {
        return c.json({
            success: false,
            message: "Invalid token"
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const authorId = c.get("userId")
    const body = await c.req.json()

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id,
        blog
    })
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id,
        blog
    })
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: body.id
            }
        })

        return c.json({
            blog
        })
    } catch (error) {
        c.json(400)
    }
})

blogRouter.get('/blogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany()

    return c.json({
        success: true,
        message: "Fetched all blogs",
        blogs
    })
})