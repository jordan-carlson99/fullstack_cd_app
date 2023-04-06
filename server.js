import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.port || 3000;
const relativePath = path.resolve("./");

app.get("/", (req, res) => {
  res.sendFile(path.join(relativePath, "/index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(relativePath, "/styles.css"));
});

app.get("/index.js", (req, res) => {
  res.sendFile(path.join(relativePath, "/index.js"));
});

app.listen(port, () => {
  console.log(`started on ${port}`);
});
