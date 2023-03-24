const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    // required: true,
  },
});

Schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
  }
  next();
});
module.exports = mongoose.model("User", Schema);
