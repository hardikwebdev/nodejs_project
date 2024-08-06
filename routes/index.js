let express = require('express');
let router = express.Router();
let adminRoute = require("./admin/index");
let v1ApiRouter = require("./v1-api");
let controller = require("./index.controller");

router.use("/admin", adminRoute);
router.use("/v1", v1ApiRouter);

// Script to import data from file
router.get('/importScript', controller.importScript);
router.get('/importReportScript', controller.importReportScript);


module.exports = router;