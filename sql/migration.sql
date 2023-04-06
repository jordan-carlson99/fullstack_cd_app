DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS total;
CREATE TABLE artist (
    artist_id SERIAL UNIQUE,
    is_active boolean, 
    amount_album integer,
    year_formed date,
    artist_name varchar(255),
    PRIMARY KEY(artist_id)
);
CREATE TABLE album (
    album_id SERIAL UNIQUE,
    artist_id int NOT NULL,
    genre varchar(255),
    rating integer,
    release_year date,
    album_name varchar(255),
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id),
    PRIMARY KEY(album_id)
);