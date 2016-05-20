var express = require('express'),
	fs = require('fs'),
	jf = require('jsonfile');
var botObj = {};

botObj.app = express();

botObj.commandList = {
	loadserver1: {
		"command1": "ls"
	},
	loadserver2: {
		"command2": "ls -la"
	}
}

botObj.app.get('/bot', function (req, res) {
	var date = new Date();
	var obj = {"id": date.getTime(),command: "release/next"};
	botObj.appendBotQueue(res, obj);
});

// botObj.app.get('/botloadjson', function (req, res) {

// 	fs.readFile(__dirname + '/botqueue/queue.json', 'utf8', function (err,data) {
// 	  if (err) {
// 	    return console.log(err);
// 	  }
// 	  res.send(data);
// 	});
// });

botObj.app.get('/botupdatejson', function (req, res) {
	var queueID
		newQueueObj = [];

	filePath = __dirname + '/botqueue/queue.json';

	if (req.query.id && req.query.id !== '') {
		queueID = req.query.id;

		jf.readFile(filePath, function(err,obj){
			var i,
				sliceIndex = -1;
			fileQueueObj = obj;

			for (i=0; i< fileQueueObj.length; i++) {
				if (fileQueueObj[i].id != queueID) {
					newQueueObj.push(fileQueueObj[i]);
				}
			}
			
			fs.writeFile(filePath, JSON.stringify(newQueueObj), function (err) {

			});
		});
	}
	jf.readFile(filePath, function(err,obj){
		res.send(obj);
	});
	
});

botObj.appendBotQueue = function (res,obj){

	var newObj = obj,
		filePath = __dirname + '/botqueue/queue.json',
		fileQueueObj;

	jf.readFile(filePath, function(err,obj){
		fileQueueObj = obj;
		fileQueueObj.push(newObj);
		res.send(fileQueueObj);


		fs.writeFile(filePath, JSON.stringify(fileQueueObj), function (err) {
		  //console.log(err);
		});
	});
}

botObj.app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
