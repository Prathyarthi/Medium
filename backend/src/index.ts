import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header('Authorization') || ""
  const token = header?.split(' ')[1]

  const verifyToken = await verify(token, c.env.JWT_SECRET)

  if (verifyToken) {
    next()
  }
  else {
    return c.json({
      success: false,
      message: "Invalid token"
    })
  }
  await next()
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
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

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

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

app.post('/api/v1/blog', (c) => {
  return c.text('blog')
})

app.put('/api/v1/blog', (c) => {
  return c.text('update')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('get blog')
})

export default app
