import SocketIO from 'socket.io'

let io

let init = (server) => {
	io = new SocketIO(server)
	io.on('connection', (socket) => {

	})
}

export {
	init,
	io
}
