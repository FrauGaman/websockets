const http = require('http');
let server = http.createServer(function(request, response){});
const io = require('socket.io').listen(server);
const randomWords = require('random-words');

function createSentence() {
	let sentence = randomWords({ min: 2, max: 30, join: ' '});
	sentence = sentence[0].toUpperCase() + sentence.slice(1);
	return sentence;
}

io.sockets.on('connection', function (socket) {
	socket.emit('open', 'Connection is established');
	let timerId = setTimeout( function connect() {
		socket.emit('message', createSentence());
		timerId = setTimeout(connect, 3000);
	}, 3000);

});

io.sockets.on('disconnect', function(status) {
	console.log(status);

	if (status === 'io server disconnect') {
		socket.close();
	}
});



server.listen(8080);