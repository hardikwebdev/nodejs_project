let express = require('express');
let router = express.Router();
let AuthMiddleware = require('../../middleware/api-auth').AuthMiddleware;

let authRouter = require("./auth");
let userRouter = require("./user-profile");
let projectsRouter = require("./projects");
let notificationRouter = require("./notifications");
let outletRouter = require("./outlets");

// /* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Apppp' });
});

router.use("/auth", authRouter);
router.use("/user-profile", AuthMiddleware, userRouter);
router.use("/notifications", AuthMiddleware, notificationRouter);
router.use("/outlets", AuthMiddleware, outletRouter);

module.exports = router;