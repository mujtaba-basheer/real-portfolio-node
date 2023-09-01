"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dbPassword = process.env.MONGO_DATABASE_PASSWORD;
const mongoUri = process.env.MONGO_CONNECTION_URI.replace("<password>", encodeURIComponent(dbPassword));
const mongoClient = new mongodb_1.MongoClient(mongoUri);
const database = mongoClient.db("portfolio");
exports.default = database;
