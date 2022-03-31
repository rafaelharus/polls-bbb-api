const MongoConnection = require("../infra/mongo");
const config = require("../config");

const AuthorizationHeader = () =>
  "Basic NGM3M2VjMTk0MTUyY2FkNjg2ZjUxNTQzY2ZkZmFhMzU6MzJmOTI0NDNhNzI4YzJkZjMwNjk0M2MwMjFlNjBiMGU=";
async function dropCollection(collectionName) {
  if (process.env.NODE_ENV === "test") {
    const conn = await MongoConnection(null, config);
    const db = conn.db(config.db.dbName);
    await db.collection(collectionName).drop();
  }
}

async function populateCollection(collectionName, objects) {
  const conn = await MongoConnection(null, config);
  const db = conn.db(config.db.dbName);
  await db.collection(collectionName).insertMany(objects);
}

module.exports = {
  AuthorizationHeader,
  dropCollection,
  populateCollection,
};
