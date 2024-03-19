import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

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
  } catch (error) {
    return c.status(403)
  }
  return c.text('Signup')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Signin')
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
