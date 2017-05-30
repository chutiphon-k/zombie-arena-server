import SocketIO from 'socket.io'
import firebase from 'firebase'

let io
let clients = []
let enemies = []
let playerSpawnPoints = []
let enemySpawnPoints = []
let teamName = 'unknow'
let isGenEnemy = false
let score = 0
let currentWave = 1
let spawnEnemy
let wave = {
	1: {
		n: 10,
		delay: 4000
	},
	2: {
		n: 15,
		delay: 3500
	},
	3: {
		n: 20,
		delay: 3500
	},
	4: {
		n: 30,
		delay: 3000
	},
	5: {
		n: 40,
		delay: 3000
	},
	6: {
		n: 45,
		delay: 3000
	},
	7: {
		n: 50,
		delay: 2500
	},
	8: {
		n: 50,
		delay: 2400
	},
	9: {
		n: 50,
		delay: 2300
	},
	10: {
		n: 60,
		delay: 2000
	}
}

let history = firebase.database().ref(`history`)

let resetData = () => {
	clients = []
	enemies = []
	playerSpawnPoints = []
	enemySpawnPoints = []
	teamName = 'unknow'
	isGenEnemy = false
	score = 0
	currentWave = 1
	clearInterval(spawnEnemy)
}

let init = (server) => {
	io = new SocketIO(server)
	io.on('connection', (socket) => {
		console.log('connected')
		let currentPlayer = {
			name: 'unknown',
			position: [],
			health: undefined,
			character: undefined
		}

		socket.on('player_connect', () => {
			console.log(`${currentPlayer.name} on: player connect`)
			clients.map(client => {
				socket.emit('other_player_connected', client)
				console.log(`${currentPlayer.name} emit: other player connected: ${JSON.stringify(client)}`)
			})
		})

		socket.on('play', (data) => {
			if (clients.length === 0) {
				teamName = data.teamName
				genEnemy()
				spawnEnemy = setInterval(() => {
					if (enemies.filter(enemy => enemy.isDeath !== true).length === 0 && enemies.length !== 0) {
						if (!isGenEnemy) {
							isGenEnemy = true
							genEnemy()
						}
					}
				}, 500)
				enemySpawnPoints = data.enemySpawnPoints
				playerSpawnPoints = []
				data.playerSpawnPoints.map((_playerSpawnPoint) => {
					let { position, rotation } = _playerSpawnPoint
					playerSpawnPoints.push({ position, rotation })
				})
			}
			let enemiesResponse = { enemies }
			console.log(`${currentPlayer.name} emit: enemies: ${JSON.stringify(enemiesResponse)}`)
			socket.emit('enemies', enemiesResponse)
			let randomSpawnPoint = playerSpawnPoints[Math.floor(Math.random() * playerSpawnPoints.length)]
			let { position, rotation } = randomSpawnPoint
			currentPlayer = {
				name: data.name,
				position,
				rotation,
				health: 100,
				isDeath: false
			}
			clients.push(currentPlayer)
			console.log(`${currentPlayer.name} emit: play: ${JSON.stringify(currentPlayer)}`)
			socket.emit('play', currentPlayer)
			socket.broadcast.emit('other_player_connected', currentPlayer)
		})

		socket.on('player_move', (data) => {
			// console.log(`recv: move: ${JSON.stringify(data)}`)
			currentPlayer.position = data.position
			socket.broadcast.emit('player_move', currentPlayer)
		})

		socket.on('enemy_move', (data) => {
			// console.log(`recv: move: ${JSON.stringify(data)}`)
			let e = enemies.find(enemy => enemy.name === data.name)
			if (data.hasOwnProperty('position') && e != undefined) {
				e.position = data.position
				socket.broadcast.emit('enemy_move', e)
			}
		})

		socket.on('player_action', (data) => {
			// console.log(`${currentPlayer.name} recv: action`)
			let value = {
				...data,
				name: currentPlayer.name
			}
			socket.emit('player_action', value)
			socket.broadcast.emit('player_action', value)
		})

		socket.on('zombie_dead', (data) => {
			enemies = enemies.map((enemy, index) => {
				if (enemy.name === data.name) {
					enemy.isDeath = true
					score += 100
					let playData = {
						wave: currentWave,
						score: score
					}
					socket.emit('play_data', playData)
				}
				return enemy
			})
		})

		let genEnemy = () => {
			let roundSpawn = 0
			enemies = []
			let data = {
				wave: currentWave,
				score: score
			}
			socket.emit('play_data', data)
			let waveSpawnEnemy = setInterval(() => {
				console.log(enemies.length)
				roundSpawn++
				let newEnemies = []
				enemySpawnPoints.map(enemySpawnPoint => {
					let newEnemy = {
						name: Math.random().toString(36).substring(7),
						position: enemySpawnPoint.position,
						health: 10,
						isDeath: false
					}
					enemies.push(newEnemy)
					newEnemies.push(newEnemy)
				})
				let enemiesResponse = { enemies: newEnemies }
				console.log(`${currentPlayer.name} emit: enemies: ${JSON.stringify(enemiesResponse)}`)
				socket.emit('enemies', enemiesResponse)
				socket.broadcast.emit('enemies', enemiesResponse)
				if (roundSpawn >= wave[currentWave].n / enemySpawnPoints.length) {
					++currentWave
					isGenEnemy = false
					clearInterval(waveSpawnEnemy)
				}
			}, wave[currentWave].delay)
		}

		socket.on('horizontal', (data) => {
			// console.log(`${currentPlayer.name} recv: action`)
			let value = {
				...data,
				name: currentPlayer.name
			}
			socket.emit('horizontal', value)
			socket.broadcast.emit('horizontal', value)
		})

		socket.on('disconnect', () => {
			console.log(`${currentPlayer.name} recv: disconnect ${currentPlayer.name}`)
			socket.broadcast.emit('other_player_disconnected', currentPlayer)
			console.log(`${currentPlayer.name} bcst: other player disconnected ${currentPlayer}`)
			let index = clients.findIndex(client => client.name === currentPlayer.name)
			clients.splice(index, 1)
			if (clients.length === 0) {
				resetData()
			}
		})

		socket.on('dead', (data) => {
			clients = clients.map(client => {
				if (currentPlayer.name === data.name) {
					client.isDeath = true
				}
				return client
			})
			console.log(clients)
			if (clients.filter(client => client.isDeath === false).length === 0) {
				socket.emit('end', { score })
				history.once('value')
						.then((snapshots) => {
							history.push({
								id: snapshots.numChildren() + 1,
								team: teamName,
								nperson: clients.length,
								score,
								timestamp: firebase.database.ServerValue.TIMESTAMP
							})
							resetData()
						})
			}
		})

		socket.on('ranking', () => {
			history.on('value', (snapshots) => {
				const result = []
				snapshots.forEach((snapshot) => {
					result.push(snapshot.val())
				})
				let ranking = result.sort((a, b) => b.score - a.score).slice(0, 10)
				console.log(ranking)
				socket.emit('ranking', { ranking })
			})
		})
	})
}

export {
	init,
	io
}
