DROP DATABASE IF EXISTS vnt;
CREATE DATABASE vnt;
USE vnt;

# Users may have visited multiple videos
CREATE TABLE access_log (
	entry int NOT NULL AUTO_INCREMENT key,
	username VARCHAR(20),
	url VARCHAR(100)
);

# Each video has a unique note id
CREATE TABLE videos (
	url VARCHAR(100) key,
	note_id VARCHAR(100)
);

# Each id may have multiple notes
CREATE TABLE notes (
	note_id VARCHAR(100),
	note VARCHAR(100) key
);

# Each note has a corresponding image
CREATE TABLE images (
	note VARCHAR(100) key,
	image VARCHAR(100)
);

DESCRIBE access_log;
DESCRIBE videos;
DESCRIBE notes;
DESCRIBE images;