import SocketIO from 'socket.io'

let io

let init = (server) => {
	io = new SocketIO(server)
	io.on('connection', (socket) => {
		socket.on('join', (room) => {
			console.log('joined')
			socket.join(room)
		})
	})
}

export {
	init,
	io
}
