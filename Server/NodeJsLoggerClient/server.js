const mqtt = require('mqtt');
const options = {
    port: 1883,
    host: 'broker.mqttdashboard.com'
}
const client = mqtt.connect(options);
dataService = require('./dataService.js');
restService = require('./restService.js');

// Subscribes to all Topics
client.subscribe('test/HTLLeonding/MQTT/NCA');

// If the client receives data it will be inserted into the mongodb
client.on('message', function(topic, message, packet) {
	console.log("Topic: " + topic.toString());
	console.log("Message: " + message.toString());
	dataService.sendDataToDb(topic,message);
});