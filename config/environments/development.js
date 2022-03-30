const path = require("path");

const logPath = path.join(__dirname, "../../logs/dev.log");

module.exports = {
  hostName: process.env.HOST_NAME,
  web: {
    port: process.env.PORT,
  },
  db: {
    dbName: "clashes",
    uri: process.env.DATABASE_URL || "mongodb://localhost:27017",
    options: {
      socketTimeoutMS: 5000,
    },
  },
  logging: {
    appenders: {
      console: { type: "console" },
      file: { type: "file", filename: logPath },
    },
    categories: {
      default: { appenders: ["console"], level: "debug" },
    },
  },
};
