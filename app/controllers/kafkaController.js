const kafka = require('../kafka')

const producer = kafka.producer()

// Store webhook contents into appropriate Kafka topic
exports.create = (req, res) => {
  // example payload
  // {"topic":"device-events","events":[{"ap":"5c5b35f1f470","ap_name":"mist-ap-office","audit_id":"6175746f-0000-0000-3157-000000000000","device_name":"mist-ap-office","device_type":"ap","ev_type":"NOTICE","mac":"5c5b35f1f470","org_id":"2de61580-7726-487e-9998-abb09b9c16e7","site_id":"36c014c2-661b-4f6b-b1b3-99e0bf8ea14a","site_name":"home","timestamp":1631648305,"type":"AP_RECONFIGURED"},{"ap":"5c5b35f1f470","ap_name":"mist-ap-office","device_name":"mist-ap-office","device_type":"ap","ev_type":"NOTICE","mac":"5c5b35f1f470","org_id":"2de61580-7726-487e-9998-abb09b9c16e7","reason":"power_cycle","site_id":"36c014c2-661b-4f6b-b1b3-99e0bf8ea14a","site_name":"home","timestamp":1631648305,"type":"AP_RESTARTED"},{"ap":"5c5b35f1f470","ap_name":"mist-ap-office","device_name":"mist-ap-office","device_type":"ap","ev_type":"NOTICE","mac":"5c5b35f1f470","org_id":"2de61580-7726-487e-9998-abb09b9c16e7","site_id":"36c014c2-661b-4f6b-b1b3-99e0bf8ea14a","site_name":"home","timestamp":1631648305,"type":"AP_CONNECTED"}]}

  // Validate request
  if (!req.body.topic) {
    console.log('missing topic within the body', req.body)
    res.status(400).send({ message: "There needs to be a topic key within the body!" });
    return;
  }

  if (!req.body.events) {
    console.log('missing events within the body', req.events)
    res.status(400).send({ message: "There needs to be a events key within the body!" });
    return;
  }

  // create objects topic and events from our webhook body
  // console.log('req: ', req.body)
  const webhookTopic = JSON.stringify(req.body.topic)
  const webhookEvents = JSON.stringify(req.body.events)
  const kafkaTopic = 'mist-webhooks-events'

  console.log('webhookTopic: ', webhookTopic)
  console.log('webhookEvents: ', webhookEvents)

  async () => {
    await producer.connect()

    // after the produce has connected, we start an interval timer
    setInterval(async () => {
      try {
        // send a message to the configured topic with
        // the key and value formed from the current value of `topic` and `events`
        await producer.send({
          kafkaTopic,
          messages: [
            {
              webhookTopic: webhookTopic,
              webhookEvents: webhookEvents,
            },
          ],
        })

        // if the message is written successfully, log it
        console.log("webhook written webhookTopic: ", webhookTopic)
        console.log("webhook written webhookEvents: ", webhookEvents)
      } catch (err) {
        console.error("could not write message " + err)
      }
    })

  }

  // return a 200
  res.status(200).send({
    message: 'thank you for your message'
  });
};

// // Retrieve all Configs from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

//   Config.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving configs."
//       });
//     });
// };

