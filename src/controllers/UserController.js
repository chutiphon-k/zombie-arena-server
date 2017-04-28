import { User } from 'models'
import { UserService } from 'services'

const getUsers = (req, res) => {
	UserService.getUsers().then((users) => {
		res.json(users)
	})
}

const postUser = (req, res) => {
	const { username, firstname, lastname, nickname } = req.body
	User.forge({ username, firstname, lastname, nickname }).save().then((user) => {
		res.json(user)
	}).catch((err) => {
		res.sendStatus(403)
	})
}

const getUserById = (req, res) => {
	let { id } = req.params
	User.forge({ id }).fetch().then((user) => {
		res.json(user)
	})
}

const patchUserById = (req, res) => {
	let { id } = req.params
	const { username, firstname, lastname, nickname } = req.body
	User.forge({ id }).fetch({ require: true }).then((user) => {
		user.save({ username, firstname, lastname, nickname }).then((user) => {
			res.json(user)
		}).catch(() => {
			res.sendStatus(403)
		})
	}).catch(() => {
		res.sendStatus(404)
	})
}

const deleteUserById = (req, res) => {
	let { id } = req.params
	User.forge({ id }).destroy().then((user) => {
		res.sendStatus(200)
	})
}

export {
	getUsers,
	postUser,
	getUserById,
	patchUserById,
	deleteUserById
}