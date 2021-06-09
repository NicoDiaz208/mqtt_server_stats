const express = require('express'),
app = express(),
port = 9020;
const cors = require('cors')
app.use(cors())
dataService = require('./dataService.js');


// Gets all the data in the dataService
app.get('/getAll', function (req, res) {
	dataService.sendDataToRest(req,res);
});

// Gets all the data in the dataService from the requested topic
app.get('/getTopic/', function (req, res) {
	dataService.sendDataToRest(req,res);	
});  


// Sets the port the app will listen to (3000)
app.listen(port);
console.log('app listening on port: '+port);
