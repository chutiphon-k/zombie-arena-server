import knex from 'knex'
import bookshelf from 'bookshelf'
import cascadeDelete from 'bookshelf-cascade-delete'

import knexfile from 'root/knexfile'

const dbConfig = knexfile.development
const Bookshelf = bookshelf(knex(dbConfig))

Bookshelf.plugin(cascadeDelete)

export default Bookshelf
