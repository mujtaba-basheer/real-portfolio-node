import * as express from "express";
import * as morgan from "morgan";
import cors from "./middleware/cors";
import router from "./routes";
import { config } from "dotenv";
config();

const app = express();

app.options("*", cors);
app.use(cors());
// @ts-ignore
app.use(express.json({ limit: "5mb" }));

// @ts-ignore
app.use(morgan("dev"));
app.use("/api", router);

app.get("/*", (req, res) => {
  res.send("API running successfully...\n");
});

// spinning up the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}...`)
);

process.on("unhandledRejection", (err: { name: string; message: string }) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
