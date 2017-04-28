import { User } from 'models'

const getUsers = () => {
	return User.forge().fetchAll().then((collection) => {
		return collection.toJSON()
	})
}

export {
	getUsers
}
