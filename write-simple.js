const fs = require('fs');
fs.writeFile('target.txt', 'messsage', function(err) {
	if (err) {
		throw err;
	}
	console.log('file writed');
});