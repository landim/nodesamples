const fs = require('fs'), filename = process.argv[2];
if (!filename) {
	throw Error('A file to watch is missing!');
}
fs.watch('target.txt', function() {
	console.log("File 'target.txt'just changed!");
});
console.log('Now watching target.txt for changes...');
