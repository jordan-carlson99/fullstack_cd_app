import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const { Client } = pg;
const port = process.env.apiPort || 3500;

const client = new Client(process.env.connectionString);
client.connect();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/albums/:search", async (req, res) => {
  if (req.params.search == "all") {
    let data = await client.query(`SELECT * FROM total`);
    res.send(data.rows);
  } else {
    let data = await client.query(
      `SELECT * FROM total WHERE album_name LIKE '%${req.params.search}%'`
    );
    res.send(data.rows);
  }
});

app.get("/api/artists", async (req, res) => {
  let data = await client.query("SELECT * FROM total");
  res.send(data.rows);
});

app.get("/api/artists/:search", async (req, res) => {
  let data = await client.query(
    `SELECT * FROM total WHERE artist_name LIKE '%${req.params.search}%'`
  );
  res.send(data.rows);
});

app.use("*", (req, res) => {
  res.status(404).send("index out of range!");
});

app.get("/", (req, res) => {
  res.send("api good");
});

app.listen(port, "127.0.0.10", () => {
  console.log(`started on ${port}`);
});
