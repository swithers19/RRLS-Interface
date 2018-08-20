const express = require('express');
const mqtt = require('mqtt');
const router = express.Router();
const key = require('./../../config/keys');
var socket = require('./../sockets').io();

var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

var client  = mqtt.connect(key.mqttHOST,{
  username: key.mqttUser,
  password: key.mqttPass
});

client.on('connect', function () {
    console.log('client connected:' + clientId);
    client.subscribe('/RRLSsamW/config', function (err) {
        if (!err) {
          console.log('successful subscribe');
        }
      })
  });

client.on('message', (topic, message) => {
    switch (topic) {
      case '/RRLSsamW/config':
        socket.emit(topic.toString(), message.toString());
        console.log(message.toString());
        break;
      case '/RRLSsamW/debug':
        console.log(message.toString());
        break;
    }
});


module.exports = router;