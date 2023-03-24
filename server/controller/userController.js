const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

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
    const user = User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    });

    const userData = await user.save();
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

// const loginUser = async (req, res) => {
//   const { name, email, mobile, password } = req.body;

//   if (!name || typeof name !== "string") {
//     return res.json({ status: "error", error: "Invalid username" });
//   }
//   if (!password || typeof password !== "string") {
//     return res.json({ status: "error", error: "Invalid password" });
//   }
//   if (password.length < 5) {
//     return res.json({
//       status: "error",
//       error: "Password must be at least 5 characters",
//     });
//   }

//   const user = await User.findOne({ email }).lean(); //lean return simple object representation of document4

//   if (!user) {
//     res.json({ status: "error", error: "Invalid username/Password" });
//   }

//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ id: user._id, name: user.name }, JWT_SCERET);
//     console.log("token");

//     res.json({ status: "ok", data: "token" });
//   }
//   res.json({ status: "error", error: "Invalid username/Password" });
// };

module.exports = {
  loadRegister,
  insertUser,
  // loginUser,
};
