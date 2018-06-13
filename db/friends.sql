CREATE DATABASE friends_db;

USE friends_db;

CREATE TABLE friends (
	item_id INT NOT NULL AUTO_INCREMENT,
    friend_name VARCHAR (45) NULL,
    price INT (10) NULL,
    stock_quantity INT (5) NULL,
    PRIMARY KEY (item_id)
    );