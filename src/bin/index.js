import firebase from 'firebase'
const config = {
	apiKey: 'AIzaSyAF_cWtyt14TosvtTRSCUrbJcBHDNi9qgc',
	authDomain: 'zombie-arena.firebaseapp.com',
	databaseURL: 'https://zombie-arena.firebaseio.com',
	projectId: 'zombie-arena',
	storageBucket: 'zombie-arena.appspot.com',
	messagingSenderId: '781887455661'
}
firebase.initializeApp(config)
let history = firebase.database().ref(`history`)

history.on('value', (snapshots) => {
	const result = []
	snapshots.forEach((snapshot) => {
		result.push(snapshot.val())
	})
	let ranking = result.sort((a, b) => b.score - a.score).slice(0, 10)
	console.log(ranking)
})


// history.once('value')
// 		.then((snapshots) => {
// 			history.push({
// 				id: snapshots.numChildren() + 1,
// 				team: 'eieiza1',
// 				nperson: 2,
// 				score: 100,
// 				timestamp: firebase.database.ServerValue.TIMESTAMP
// 			})
// 		})
