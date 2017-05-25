import SocketIO from 'socket.io'

let io
let clients = []
let enemies = []
let playerSpawnPoints = []

let init = (server) => {
	io = new SocketIO(server)
	io.on('connection', (socket) => {
		console.log('connected')
		let currentPlayer = {}
		currentPlayer.name = 'unknown'

		socket.on('player_connect', () => {
			console.log(`${currentPlayer.name} on: player connect`)
			clients.map(client => {
				socket.emit('other_player_connected', client)
				console.log(`${currentPlayer.name} emit: other player connected: ${JSON.stringify(client)}`)
			})
		})

		socket.on('play', (data) => {
			console.log(`${currentPlayer.name} recv: play:: ${JSON.stringify(data)}`)
			if (clients.length === 0) {
				// enemies = []
				// data.enemySpawnPoints.map((enemySpawnPoint) => {
				// 	enemies.push({
				// 		name: Math.random().toString(36).substring(7),
				// 		position: enemySpawnPoint.position,
				// 		rotation: enemySpawnPoint.rotation,
				// 		health: 100
				// 	})
				// })
				playerSpawnPoints = []
				data.playerSpawnPoints.map((_playerSpawnPoint) => {
					let { position, rotation } = _playerSpawnPoint
					playerSpawnPoints.push({ position, rotation })
				})
			}
			// let enemiesResponse = { enemies }
			// console.log(`${currentPlayer.name} emit: enemies: ${JSON.stringify(enemiesResponse)}`)
			// socket.emit('enemies', enemiesResponse)
			let randomSpawnPoint = playerSpawnPoints[Math.floor(Math.random() * playerSpawnPoints.length)]
			let { position, rotation } = randomSpawnPoint
			currentPlayer = {
				name: data.name,
				position,
				rotation,
				health: 100
			}
			clients.push(currentPlayer)
			console.log(`${currentPlayer.name} emit: play: ${JSON.stringify(currentPlayer)}`)
			socket.emit('play', currentPlayer)
			socket.broadcast.emit('other_player_connected', currentPlayer)
		})

		socket.on('other_player_connected', (data) => {})
		socket.on('other_player_disconnected', (data) => {})
		socket.on('player_move', (data) => {})
		socket.on('player_shoot', (data) => {})
		socket.on('player_bomb', (data) => {})
		socket.on('player_jump', (data) => {})
		socket.on('player_health', (data) => {})
		socket.on('player_pick_item', (data) => {})
		socket.on('wave', (data) => {})
		socket.on('disconnect', (data) => {})
		// socket.on('player_pick_item', (data) => {})
		// socket.on('item', (data) => {})
	})
}

export {
	init,
	io
}
