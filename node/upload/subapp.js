var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.memoryStorage()
var uploadMul = multer({ storage: storage })
var fs = require('fs');
module.exports = router;
// ...
router.get('/', function (req, res) {
	var html = '<html><head>'+
		'<body><form action="file/upload" method = "post" enctype="multipart/form-data">'+
		'<input type ="text" name = "fileName"> '+
		'<input type = "file" name = "file">'+
		'<input type="submit" value="Submit">'+
		'</form></body>'+
		'</head></html>';
  res.send(html);

});

function saveFile(fileName, data, cb) {
	var folderName = router.folderName || "./";
	fs.writeFile(folderName + fileName, data, function (err) {
	  if (err) throw err;  
	  cb();
	});
}
router.post('/upload', uploadMul.any());
router.post('/upload',function(req, res) {
	//console.log(uploadMul.array())
	console.log(req.files);
	saveFile(req.files[0].originalname, req.files[0].buffer, 
		function() {res.send('File ' + req.files[0].originalname +' is saved under '+ router.folderName);})
	
});
