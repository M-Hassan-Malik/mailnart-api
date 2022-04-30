const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serciveAccount.json");
const path = require("path")

require("dotenv").config(
  { path: path.join(__dirname,'config/keys.env')}
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => res.json({ msg: "running" }));

app.use("/user", require("./api/user"));

app.use("/auth", require("./api/auth"));

app.use("/payment", require("./api/payment"));

app.use("/mail", require("./api/mail"));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
