const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const user_route = require("../router/userRoutes");

// const JWT_SCERET = "idhiuahdiuado%!@%#*!@85615jod";

// const securePassword = async (password) => {
//   try {
//     const passwordHash = await bcrypt.hash(password, 10);
//     return passwordHash;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (err) {
    console.log(err.message);
  }
};

const insertUser = async (req, res) => {
  try {
    // const sPassword = await securePassword(req.body.password);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    });

    const token = await newUser.generateAuthToken();
    console.log("the token part" + token);

    res.cookie("jwt", token);

    const userData = await newUser.save();
    console.log(userData);
    // if (userData) {
    //   res.render("registration", {
    //     message: "You have registered successfully",
    //   });
    // } else {
    //   res.render("registration", { message: "You're registration is failed " });
    // }
  } catch (err) {
    console.log(err.message);
  }
  // return res.json({ status: "success" });
};

const loginUser = async (req, res) => {
  // user_route.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // if (!email || typeof email !== "string") {
  //   return res.json({ status: "error", error: "Invalid user Email" });
  // }
  // if (!password || typeof password !== "string") {
  //   return res.json({ status: "error", error: "Invalid password" });
  // }
  // if (password.length < 5) {
  //   return res.json({
  //     status: "error",
  //     error: "Password must be at least 5 characters",
  //   });
  // }

  const useremail = await User.findOne({ email: email });
  // .lean(); //lean return simple object representation of document4

  // if (!user) {
  //   res.json({ status: "error", error: "Invalid username/Password" });
  // }

  const isMatch = await bcrypt.compare(password, useremail.password);
  // if (await bcrypt.compare(password, user.password)) {
  // console.log("check");
  const token = await useremail.generateAuthToken();
  console.log("the token part after login " + token);

  // res.json({ status: "ok", data: "token" });
  // }
  // res.json({ status: "error", error: "Invalid username/Password" });

  if (isMatch) {
    res.status(201).save();
  } else {
    res.send("Invalid username/Password");
  }
};

module.exports = {
  loadRegister,
  insertUser,
  loginUser,
};
