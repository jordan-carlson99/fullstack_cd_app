DROP TABLE IF EXISTS total;
INSERT INTO artist(is_active,amount_album,year_formed,artist_name)
VALUES
(true, 5, '1994-01-01','system of a down'),
(false, 3, '1992-01-01', 'tub ring'),
(false, 6, '1987-01-01', 'alice in chains'),
(true, 5, '2005-01-01', 'thy art is murder');
INSERT INTO album(genre,rating,release_year,album_name, artist_id)
VALUES
('metal',9,'1998-06-30','system of a down',1),
('metal', 8, '2001-09-04','toxicity', 1),
('metal', 5, '2002-11-26', 'steal this album', 1),
('alternative metal',8,'2005-05-17','mezmerize',1),
('alternative metal',7,'2005-11-22', 'hypnotize',1),
('avant garde metal',6, '2001-06-12', 'drake equation',2),
('hardcore punk',7,'2002-10-15', 'fermi paradox',2),
('hardcore punk', 9,'2004-08-17','zoo hypothesis',2),
('Grunge', 8.5, '1990-08-21', 'facelift', 3),
('Grunge', 9.0, '1992-09-29', 'dirt', 3),
('Grunge', 7.5, '1995-11-07', 'alice in chains', 3),
('Grunge', 8.0, '2009-09-29', 'black gives way to blue', 3),
('Grunge', 7.0, '2013-05-28', 'the devil put dinosaurs here', 3),
('Grunge', 8.0, '2018-08-24', 'rainier fog', 3),
('Deathcore', 8.0, '2010-06-01', 'infinite death', 4),
('Deathcore', 8.5, '2012-06-22', 'hate', 4),
('Deathcore', 7.5, '2015-07-17', 'holy war', 4),
('Deathcore', 8.0, '2017-07-26', 'dear desolation', 4),
('Deathcore', 8.5, '2020-07-31', 'human target', 4);

CREATE TABLE total AS (
    SELECT album.*, artist.artist_name, artist.is_active FROM ALBUM 
    LEFT JOIN artist ON artist.artist_id=album.artist_id);
