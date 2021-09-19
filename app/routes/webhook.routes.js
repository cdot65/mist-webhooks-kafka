module.exports = app => {
  const actions = require("../controllers/kafkaController")

  var router = require("express").Router();

  // Create a new Config
  router.post("/", actions.create);

  // Retrieve all Configs
  // router.get("/", actions.findAll);

  // API route
  app.use('/webhooks', router);
};
