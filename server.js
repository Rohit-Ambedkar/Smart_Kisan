const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dotenv = require("dotenv");
const express = require("express");
const ConnectDb = require("./config/db.js");
dotenv.config();
const app = express();
const authRouter = require("./Routes/authRouter.js");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apis
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  ConnectDb();
  console.log(`Server is running port ${process.env.PORT}`);
});
