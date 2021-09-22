const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'mist-webhooks',
  brokers: ['kafka1:9092'],
  logLevel: logLevel.INFO
})

module.exports = kafka
