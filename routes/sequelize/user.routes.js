module.exports = (app) => {
  const user = require("../../controllers/sequelize/user.controller.js");
  const log = require("../../controllers/sequelize/log.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/user/", user.create);

  // Retrieve all user
  router.get("/user/", user.findAll);
  router.get("/log", log.findAll);
  router.get("/search", log.search);

  // Retrieve all published user
  // router.get("/published", user.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/user/:id", user.findOne);

  // Update a Tutorial with id
  router.put("/user/:id", user.update);

  // Delete a Tutorial with id
  router.delete("/user/:id", user.delete);

  // Delete all user
  router.delete("/user/", user.deleteAll);

  app.use("/", router);
};
