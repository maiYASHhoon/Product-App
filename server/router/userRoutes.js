const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const services = require("../services/render");


route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// route.set("view engine", "ejs");
// route.set("views", "../../views")

const userController = require("../controller/userController");
const productController = require("../controller/productController");

/**
 * @description Root route
 * @method GET /
 */

// user_route.get("/", services.homeRoutes);

/**
 * @description add users
 * @method GET /add-user
 */
// user_route.get("/login", services.login);


// APIs
route.get("/", userController.loadRegister);
// route.get("/register", userController.insertUser);  
route.post("/register", userController.insertUser);  
route.post("/login", userController.loginUser);



// PRODUCT ROUTES


module.exports = route;
