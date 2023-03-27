const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// generating Token
userSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign(
      { _id: this._id },
      "mynameisyashdayamasoftwareengineer"
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    res.send("the error" + err);
    console.log("the error" + err);
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
