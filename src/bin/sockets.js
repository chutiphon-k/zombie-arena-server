import SocketIO from 'socket.io'

let io
let clients = []

let init = (server) => {
	io = new SocketIO(server)
	io.on('connection', (socket) => {
		console.log('connected')
		let currentPlayer = {}
		currentPlayer.name = 'unknown'

		socket.on('player_connect', (data) => {
			console.log(`${currentPlayer.name} on: player connect`)
			clients.map(client => {
				socket.emit('other_player_connected', client)
				console.log(`${currentPlayer.name} emit: other player connected: ${JSON.stringify(client)}\n`)
			})
		})

		socket.on('play', (data) => {})
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
