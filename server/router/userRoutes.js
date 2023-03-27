const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");

user_route.use(express.json());
user_route.use(express.urlencoded({ extended: true }));

user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");

const userController = require("../controller/userController");

user_route.get("/sign_up", userController.loadRegister);
user_route.post("/sign_up", userController.insertUser);
user_route.post("/login", userController.loginUser);

module.exports = user_route;
