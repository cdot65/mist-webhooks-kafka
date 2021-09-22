// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// let kafka know who's producing the messages
// define the list of brokers in the cluster
// define the topic to which we want to write messages
const clientId = "mist-webhooks-producer"
const brokers = ["kafka1:9092"]
const topic = "mist-webhooks-events"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

// we define an async function that writes a new message each second
const produce = async (req) => {
  await producer.connect()

  // after the produce has connected, we start an interval timer
  setInterval(async () => {
    try {
      // send a message to the configured topic with
      // the key and value formed from the current value of `req.body`
      await producer.send({
        topic,
        messages: [
          {
            key: req.body.topic.toString(),
            value: JSON.stringify(req.body.events),
          },
        ],
      })

      // if the message is written successfully, log it and increment `i`
      console.log("writes: ", req.body.topic)
    } catch (err) {
      console.error("could not write message " + err)
    }
  }, 10000)
}

module.exports = produce

