# Express Mysql Boilerplate

> A simple boilerplate for building RESTful API with ExpressJS and Mysql

## Package
- ExpressJS
- Babel
- Mysql
- Knex
- Bookshelf
- Socket.io

## Using API
  - Config your database in `knexfile.js`
  - Run command
  
```bash
git clone https://github.com/chutiphon-k/express-mysql-boilerplate.git
npm install
npm run build # Migrate and seed database
npm run dev # For run development
```

## RESTful API

| HTTP METHOD | GET            | POST       | PUT         | PATCH | DELETE |
| ----------- | --------------- | --------- | ----------- | ------ | ------ |
| /example       | Get Example | Post Example |  | Patch Example | Delete Example |
| /users       | List users | Create new user |  |  |  |
| /users/:id       | Get user by id |  |  | Update user by id | Delete user by id |

## Request & Response Examples

### API Resources

  - [GET /users](#get-users)
  - [POST /users](#post-usersid)
  - [GET /users/:id](#get-usersid)

### GET /users

Example: http://localhost:9090/api/users

Response body:

	[
		{
			"id": 1,
			"username": "user1",
			"firstname": "ชุติพนธ์",
			"lastname": "คงสมพรต",
			"nickname": "เจมส์",
			"created_at": "2017-03-11T15:28:58.000Z",
			"updated_at": "2017-03-11T15:28:58.000Z"
		},
		{
			"id": 2,
			"username": "user2",
			"firstname": "สมชาย",
			"lastname": "นะครับ",
			"nickname": "ชาย",
			"created_at": "2017-03-11T15:28:58.000Z",
			"updated_at": "2017-03-11T15:28:58.000Z"
		},
		{
			"id": 3,
			"username": "user3",
			"firstname": "สมหญิง",
			"lastname": "นะค่ะ",
			"nickname": "หญิง",
			"created_at": "2017-03-11T15:28:58.000Z",
			"updated_at": "2017-03-11T15:28:58.000Z"
		}
	]

### POST /users

Example: Create – POST  http://localhost:9090/api/users

Request body:

    {
		"username": "user4",
		"firstname": "hello",
		"lastname": "world",
		"nickname": "haha",
    }

### GET /users/:id

Example: http://localhost:9090/api/users/1

Response body:

	{
		"id": 1,
		"username": "user1",
		"firstname": "ชุติพนธ์",
		"lastname": "คงสมพรต",
		"nickname": "เจมส์",
		"created_at": "2017-03-11T15:28:58.000Z",
		"updated_at": "2017-03-11T15:28:58.000Z"
	}
