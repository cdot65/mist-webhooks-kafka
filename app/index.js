/*
 - EXPRESS SETUP
*/
// import express library
const express = require("express");

// instantiate the webhook receiving API server
const app = express();

// set defaults for parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*
 - KAFKA SETUP
*/
// import Kafka services
const produce = require("./kafkaProducer")


/*
 - API routes
*/
// hello world route
app.get("/", (req, res) => {
  res.json({message: "Welcome"});
})

// webhook receiver route
app.post('/webhooks', (req, res) => {
  console.log('Got body:', req.body);
  produce(req)
  res.sendStatus(200);
})


/*
 - RUN EXPRESS
*/
// constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// start express web server
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
})
