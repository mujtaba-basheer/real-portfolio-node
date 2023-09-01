import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const dbPassword = process.env.MONGO_DATABASE_PASSWORD;
const mongoUri = process.env.MONGO_CONNECTION_URI.replace(
  "<password>",
  encodeURIComponent(dbPassword)
);
const mongoClient = new MongoClient(mongoUri);
const database = mongoClient.db("portfolio");

export default database;
