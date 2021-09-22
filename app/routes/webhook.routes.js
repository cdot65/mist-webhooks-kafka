module.exports = app => {
  const produce = require("../controllers/kafkaController")

  var router = require("express").Router();

  // Create a new Config
  router.post("/", (req, res), produce);

  // API route
  app.use('/webhooks', router);
};
