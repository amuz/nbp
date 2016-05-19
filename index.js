var express = require('express'),
	fs = require('fs');
var botObj = {};

botObj.app = express();

botObj.commandList = {
	loadserver1: "think server restart",
	loadserver2: "landingpage.sh batch file load"
}

botObj.loadCommand = function (res, command, req) {
	res.send("queryparam2 " + botObj.commandList[command]);

	botObj.updateCommandFile(res, botObj.commandList[command], req);
}

// app.get('/', function (req, res) {
// 	res.json({ user: 'tobi' });
// });

botObj.app.get('/bot', function (req, res) {
	//res.json({ user: 'tobi' });
	//res.send('queryparam ' + req.query.loader);
	botObj.loadCommand (res, req.query.loader, req);
});

botObj.app.get('/botloadjson', function (req, res) {
	//res.json({ user: 'tobi' });
	//res.send('queryparam ' + req.query.loader);
	// botObj.loadCommand (res, req.query.loader, req);
	fs.readFile(__dirname + '/botqueue/queue.json', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }

	  //console.log(data);
	  res.send(data);
	});
});

botObj.app.listen(80, function () {
  console.log('Example app listening on port 3000!');
});

botObj.updateCommandFile = function (res, command, req) {
	//__dirname + '/botcommandlist/data.txt'
	fs.appendFile(__dirname + '/botcommandlist/data.txt', '\r\n' + command , function (err) {

	});


	// console.log(__dirname);
 //    var body = '';
 //    filePath = __dirname + '/botcommandlist/data.txt';
 //    req.on('data', function(data) {
 //        body += data;
 //        console.log(data);
 //    });

 //    req.on('end', function (){
 //        // fs.appendFile(filePath, body, function() {
 //            res.end();
 //        // });
 //    });
}