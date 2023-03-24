var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const auth = require("./server/middleware/auth");

const app = express();

const { json } = require("express");
const { log } = require("console");
app.use(morgan("tiny"));

require("./server/db/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.use(express.static(path.resolve(__dirname, "assets/images")));

const userRoute = require("./server/router/userRoutes");
app.use("/", userRoute);
// app.use("/", express.static(path.join(__dirname, "views/users")));

// app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
// app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
// app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
