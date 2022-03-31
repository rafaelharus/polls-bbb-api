const path = require("path");

const logPath = path.join(__dirname, "../../logs/test.log");

module.exports = {
  hostName: process.env.HOST_NAME,
  web: {
    port: 3001,
  },
  db: {
    dbName: "clashes_test",
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
  auth: [
    {
      identity: "4c73ec194152cad686f51543cfdfaa35",
      credential: "32f92443a728c2df306943c021e60b0e",
    },
  ],
};
