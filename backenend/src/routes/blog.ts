import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx'

import { createPostInput, updatePostInput } from '@kind5/medium-common' 
import { cors } from 'hono/cors'

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }, Variables : {
        userId : string
    }
}>()


blogRouter.use('/*', cors())

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
	const token = authHeader.split(' ')[1];

	try {
		const user = await verify(token, c.env.JWT_SECRET);
		if (user) {
			c.set('userId', user.id);
			await next()
		} else {
			c.status(403);
			return c.json({ message : "you are not logged in"});
		}
	} catch (e) {
		c.status(403);
		return c.json({ message : "you are not logged in"});	
	}

})

blogRouter.post('/', async(c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = createPostInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ error: "inputs not correct"});	
	}

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})
  
blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = updatePostInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ error: "inputs not correct"});	
	}
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})
  
// Todo : Add pagination
blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.post.findMany({
		select: {
			content:true,
			title: true,
			id: true,
			publishDate : true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json({blogs});
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}, 
		select : {
			id: true,
			title: true,
			content: true,
			publishDate: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json(post);
})
