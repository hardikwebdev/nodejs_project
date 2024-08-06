let express = require('express');
let router = express.Router();
let authRoute = require("./auth/index");
let userRoute = require("./users/index");
let projectRoute = require("./projects/index");
let categoryRoute = require("./category/index");
let rolesRoute = require("./roles/index");
let productRoute = require("./products/index");
let adminProfileRoute = require("./my-profile/index");
let regionsRoute = require("./regions/index");
let outletsRoute = require("./outlets/index");
let generalRoute = require("./general/index");
let AuthMiddleware = require("../../middleware/auth").AuthMiddleware;

router.use("/auth", authRoute);
router.use("/users", AuthMiddleware, userRoute);
router.use("/projects", AuthMiddleware, projectRoute);
router.use("/products", AuthMiddleware, productRoute);
router.use("/category", AuthMiddleware, categoryRoute);
router.use("/roles", AuthMiddleware, rolesRoute);
router.use("/regions", AuthMiddleware, regionsRoute);
router.use("/outlets", AuthMiddleware, outletsRoute);
router.use("/general", AuthMiddleware, generalRoute);
router.use("/", AuthMiddleware, adminProfileRoute);


module.exports = router;