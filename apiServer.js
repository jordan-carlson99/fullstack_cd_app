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
      `SELECT album.*, artist.artist_name, artist.is_active FROM ALBUM 
      LEFT JOIN artist ON artist.artist_id=album.artist_id WHERE album.album_name LIKE '%${req.params.search}%';`
    );
    res.send(data.rows);
  }
});

app.get("/api/artists/:search", async (req, res) => {
  let data;
  if (req.params.search == "all") {
    data = await client.query(`SELECT * FROM total`);
  } else {
    data = await client.query(
      `SELECT album.*, artist.artist_name, artist.is_active FROM ALBUM 
      LEFT JOIN artist ON artist.artist_id=album.artist_id WHERE artist.artist_name LIKE '%${req.params.search}%';`
    );
  }
  if (data.rowCount < 1) {
    res.status(404).send("data not found!");
  } else {
    res.send(data.rows);
  }
});

app.get("/api/exactArtist/:search", async (req, res) => {
  let data = await client.query(
    `SELECT artist_id FROM artist WHERE artist_name=$1`,
    [req.params.search]
  );
  if (data.rowCount < 1) {
    res.status(404).send("not found!");
  } else {
    res.send(data.rows);
  }
});

app.post("/api/append/:ifExists/:id", async (req, res) => {
  console.log(req);
  let newId;
  if (req.params.ifExists == "true") {
    client.query(
      `INSERT INTO album(artist_id, genre, rating, release_year, album_name)
      VALUES ($1,$2,$3,$4,$5);`,
      [
        req.params.id,
        req.body.genre,
        req.body.rating,
        req.body.release_year,
        req.body.album_name,
      ]
    );
    client.query(
      `UPDATE artist SET amount_album = amount_album + 1 WHERE artist_id = $1;`,
      [req.params.id]
    );
    res.send("success");
  } else {
    console.log("false!");
    client.query(
      `INSERT INTO artist(is_active,amount_album,year_formed,artist_name)
    VALUES
    ($1,1,NULL,$2)`,
      [req.body.is_active, req.body.artist_name]
    );
    newId = await client.query(
      `SELECT artist_id,artist_name FROM artist WHERE artist_name=$1`,
      [req.body.artist_name]
    );
    console.log(newId);
    client.query(
      `INSERT INTO album(artist_id, genre, rating, release_year, album_name)
    VALUES ($1,$2,$3,$4,$5);`,
      [
        newId.rows[0].artist_id,
        req.body.genre,
        req.body.rating,
        req.body.release_year,
        req.body.album_name,
      ]
    );
    res.send("success");
  }
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
