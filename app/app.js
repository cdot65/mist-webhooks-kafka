const consumer = require("./consumer")

// start the consumer, and log any errors
consumer().catch((err) => {
  console.error("error in consumer: ", err)
})
