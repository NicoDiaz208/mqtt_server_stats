const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost";
const dbName = "sensor"
var db;
var data;




MongoClient.connect(url, function(err, client) {
	if (err) throw err;
	console.log("Database Connection established!");
	// Gets the Database by name (sensor)
	db = client.db(dbName);
	// Creates a connection to the collection named 'data'
	data = db.collection('data');
})


exports.sendDataToRest = function(req,res) {
	var last = req.query.last;
	if(req.query.topic){
		var topic = req.query.topic.replace(/"/g,"");
		var last = req.query.last;
		var query = {"Topic": {$regex: topic}};
		console.log('a');
		data.find(query).sort(compare).toArray((err, result) => {
			if(last != undefined)
				res.send(result.slice(Math.max(result.length - last, 0)));
			else
				res.send(result);
			if (err) throw err;
			console.log('Send data from Topic: '+ topic);
		}); 
	}
	else{
		data.find({}).toArray((err, result) => {
			if (err) throw err;
			if(last != undefined)
				res.send(result.slice(0,+last));
			else
				res.send(result);
			console.log('Send all Data');
		}); 
	}
	return data;
}
function compare( a, b ) {
  if ( a.Timestamp > b.Timestamp ){
    return -1;
  }
  if ( a.Timestamp < b.Timestamp ){
    return 1;
  }
  return 0;
}

exports.sendDataToDb = function(topic, message){
	data.insertOne({
		Timestamp: Date.now(),
		Topic: topic,
		Message: message.toString()
		},
		(err, datas) => {
			if(err){
				throw err;
		}
		});
}