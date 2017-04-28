exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments().primary()
      table.string('username').notNullable().unique()
      table.string('firstname')
      table.string('lastname')
      table.string('nickname')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users')
	])
};