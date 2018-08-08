
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

 USE bamazon;
CREATE TABLE products (
item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(200) NULL,
stock_quantity  INT(10),
price FLOAT(10,2)
);

INSERT INTO  products (product_name, department_name, stock_quantity, price) VALUES 
("What do you meme?", "games", 200, 29.99), ("Cards against humanity", "games", 100, 24.99), 
("Goonies", "movies", 10, 9.99), ("Big", "movies", 20, 3.99), 
("Play Doh", "toys", 500, 8.99), ("Crayola markers", "toys", 150, 15.99), 
("Kindle Oasis", "electronics", 68, 249.99), ("Bose soundLink", "electronics", 222, 99.99), 
("The Art of War", "books", 12, 5.99), ("Pride and prejudice", "books", 13, 8.99);

select * from products;

DROP TABLE products;