module.exports = {
    mongoURI: 'mongodb://swAdmin:Fusion12@ds233238.mlab.com:33238/rrls_dev',
    mqttHOST: process.env.CLOUDMQTT_HOST ||'mqtt://m14.cloudmqtt.com:14898',
    mqttPORT: process.env.CLOUDMQTT_PORT || '14898',
    mqttUser: process.env.CLOUDMQTT_USER || 'dnqgyvcy',
    mqttPass: process.env.CLOUDMQTT_PASS || 'cz9PlfBpnNF1',
    mqttTopic: process.env.CLOUDMQTT_TOPIC || 'test'
}

