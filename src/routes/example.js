import { Router } from 'express'

const router = Router()

router.route('/')
		.get((req, res) => {
			res.send('Get Example')
		})
		.post((req, res) => {
			res.json(req.body)
		})
		.patch((req, res) => {
			res.send('Patch Example')
		})
		.delete((req, res) => {
			res.send('Delete Example')
		})

export default router
