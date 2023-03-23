const User = require("../models/user");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    console.log(err.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (err) {
    console.log(err.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const sPassword = await securePassword(req.body.password);
    const user = User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: sPassword,
    });

    const userData = await user.save();
    console.log(user);

    if (userData) {
      res.render("registration", {
        message: "You have registered successfully",
      });
    } else {
      res.render("registration", { message: "You're registration is failed " });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
};
