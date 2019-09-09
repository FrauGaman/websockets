const http = require('http');
const randomWords = require('random-words');

let server = http.createServer(function(request, response){});
const io = require('socket.io').listen(server);


function createSentence() {
	let sentence = randomWords({ min: 2, max: 30, join: ' '});
	sentence = sentence[0].toUpperCase() + sentence.slice(1);
	return sentence;
}

	io.sockets.on('connection', function (socket) {
		let timerId = setTimeout( function connect() {
			socket.emit('message', createSentence());
			timerId = setTimeout(connect, 3000);
		}, 3000)

	});

server.listen(8080);