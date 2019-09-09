const http = require('http');
const WebSocket = require('ws');
const randomWords = require('random-words');

const wss = new WebSocket.Server({ port: 8080 });

function createSentence() {
	let sentence = randomWords({ min: 2, max: 30, join: ' '});
	sentence = sentence[0].toUpperCase() + sentence.slice(1);
	return sentence;
}

	wss.on('connection', function connection(ws) {
		let timerId = setTimeout(
			function connect() {
				ws.send(createSentence());
				timerId = setTimeout(connect, 3000);
			}, 3000)
	});
