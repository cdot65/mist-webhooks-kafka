const consumer = require("./kafkaConsumer")

// start the consumer, and log any errors
consumer().catch((err) => {
  console.error("error in consumer: ", err)
})
