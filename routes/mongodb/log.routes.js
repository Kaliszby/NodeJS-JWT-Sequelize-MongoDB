module.exports = app => {
    const log = require("../../controllers/mongodb/log.controller.js");

    var router = require("express").Router();

    // Retrieve all logs
    router.get("/log", log.index);
    router.get("/logall", log.findAll);

    app.use('/', router);
};