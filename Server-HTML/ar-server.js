var arDrone = require('ar-drone');
var client = arDrone.createClient();
var control = arDrone.createUdpControl();

var http = require('http');
var data = require('http');
var fs = require('fs');

var port = process.env.PORT || 8080;
var d_port = 8081;
//var o_data = {};

data
	.createServer(function (req, res) {
		//client.on('navdata', o_data);
		res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
		//res.write(o_data);
		res.write("DATA");
		res.end();
	})
	.listen(d_port, "localhost");

http
	.createServer(function (req, res) {
		fs.readFile('server.html', 'utf-8', function(err, data) {
		if (err) throw err;

		res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
		res.write(data);
		res.end();
		});

		if(req.url!="/" && req.url!='/favicon.ico' && req.url!='/jquery-2.0.3.min.map') {
			var command = req.url.substring(2,req.url.length);
			console.log("... Process: " + command);
			
			switch(command) {
				case ("takeoff"):
					client.takeoff();
					break;
				case ("land"):
					client.stop();
					client.land();
					break;
				case ("stop"):
					client.stop();
					break;
				case ("foreward"):
					client.front(0.5);
					setTimeout(function() {
						client.stop();
					},1000);
					break;
				case ("up"):
					client.up(0.5);
					setTimeout(function() {
						client.stop();
					},2000);
					break;
				case ("lights"):
					client.animateLeds('blinkGreenRed', 5,10);
					break;
			}
		}
	})
	.listen(port, "localhost");

// client.on('navdata'
	
console.log('Server running at http://127.0.0.1:' + port + '/');