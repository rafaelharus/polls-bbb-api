const path = require("path");

const logPath = path.join(__dirname, "../../logs/prod.log");

module.exports = {
  hostName: process.env.HOST_NAME || "https://polls-bbb-api-node.heroku.com",
  web: {
    port: process.env.PORT,
  },
  db: {
    dbName: "clashes",
    uri: process.env.DATABASE_URL,
    options: {
      socketTimeoutMS: 5000,
    },
  },
  logging: {
    appenders: {
      console: { type: "console", layout: { type: "basic" } },
      file: { type: "file", filename: logPath },
    },
    categories: {
      default: { appenders: ["console", "file"], level: "info" },
    },
  },
};
