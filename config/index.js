require("dotenv").config();
const path = require("path");
const { version } = require("../package.json");

const ENV = process.env.NODE_ENV || "development";

const envConfig = require(path.join(__dirname, "environments", ENV));

const config = {
  [ENV]: true,
  env: ENV,
  name: "polls-bbb-api-node",
  secretKey: process.env.SECRET_KEY || "change",
  version,
  auth: [
    {
      identity: "95e650310aa401b5852d63e59aa3a0cc",
      credential: "608743237e4faa8163c7a33121802996",
    },
  ],
  ...envConfig,
};

module.exports = config;
