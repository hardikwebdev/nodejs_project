let express = require("express");

let controller = require("./index.controller");
let router = express.Router();
let upload = require("../../../middleware/image_upload");

router.get("/", controller.outletList);

router.post("/getAddress", controller.getAddress);

router.post("/createOutlet", upload.single('file'), controller.createOutlet);

router.post("/addFeedback", controller.addFeedback);

router.post("/changeStatus", controller.changeStatus);

router.post("/executionUrl", upload.single('file'), controller.executionUrl);

router.post("/deleteExecutionUrl", controller.deleteExecutionUrl);

router.get("/getExecutionUrlList", controller.getExecutionUrlList);

router.get("/getGeneralConfigs", controller.getGeneralConfigs);

router.post("/addSales", controller.addSales);

router.post("/getOutletDetailsById", controller.getOutletDetailsById);

router.post("/cancelOrder", controller.cancelOrder);

router.get("/getEffectiveOrders", controller.getEffectiveOrders);

router.get("/getNonEffectiveOrders", controller.getNonEffectiveOrders);

router.post("/sendSMS", controller.sendSMS);

router.post("/verifyOTP", controller.verifyOTP);

router.post("/sync", controller.sync);

router.post("/offlineExecutionUrl", controller.offlineExecutionUrl);

module.exports = router;
