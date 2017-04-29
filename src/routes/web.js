import { Router } from 'express'

const router = Router()

router.route('/')
	.get((req, res) => {
		res.send('Zombie Arena Server')
	})

export default router
