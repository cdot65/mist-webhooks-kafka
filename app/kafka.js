const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'mist-webhooks',
  brokers: ['kafka1:9092']
})

module.exports = kafka
