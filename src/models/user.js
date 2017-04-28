import bookshelf from 'root/bookshelf'

const User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true
})

export default User
