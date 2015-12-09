var express = require('express');
var fileHandler = require('./subapp.js');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
fileHandler.folderName = "./";
app.use('/file', fileHandler);
console.log(typeof fileHandler)
function start() {
	var port = process.argv[2];
	var folderName = process.argv[3];
	fileHandler.folderName = folderName || fileHandler.folderName ;
	var server = app.listen(port, function () {
  		var host = '10.0.38.154';
 		console.log('Example app listening at http://%s:%s', host, port);		
	});
}
start();

