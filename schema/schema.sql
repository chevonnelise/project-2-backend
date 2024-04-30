-- SQL Schema for MyNutriHealth
CREATE DATABASE IF NOT EXISTS superfoods;
USE superfoods;

-- Creating User Table
CREATE TABLE User (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contact_no INT UNSIGNED,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255) NOT NULL,
    postal_code VARCHAR(45) NOT NULL,
    city VARCHAR(45) NOT NULL,
    country VARCHAR(45) NOT NULL
);

-- Creating ProductCategory Table
CREATE TABLE ProductCategory (
    product_category_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) UNIQUE NOT NULL,
    description TEXT
);

-- Creating Brand Table
CREATE TABLE Brand (
    brand_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45)
);


-- Creating Product Table
CREATE TABLE Product (
    product_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) UNIQUE NOT NULL,
    description TEXT,
    sku VARCHAR(255) UNIQUE NOT NULL,
    price DECIMAL(10,2),
    quantity INT UNSIGNED,
    image_url VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_category_id INT UNSIGNED,
    brand_id INT UNSIGNED,
    review_id INT UNSIGNED,
    FOREIGN KEY (product_category_id) REFERENCES ProductCategory(product_category_id),
    FOREIGN KEY (brand_id) REFERENCES Brand(brand_id)
);

-- Creating Review Table
CREATE TABLE Review (
    review_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    product_id INT UNSIGNED,
    rating INT UNSIGNED,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- Creating ShoppingSession Table
CREATE TABLE ShoppingSession (
    shopping_session_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating ShoppingCart Table
CREATE TABLE ShoppingCart (
    shopping_cart_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    quantity INT UNSIGNED,
    product_id INT UNSIGNED,
    shopping_session_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (shopping_session_id) REFERENCES ShoppingSession(shopping_session_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Creating Discount Table
CREATE TABLE Discount (
    discount_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(45) UNIQUE,
    discount_percentage DECIMAL(5,2),
    expiration_date DATE,
    status BOOLEAN
);

-- Creating OrderDetail Table
CREATE TABLE OrderDetail (
    order_detail_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Creating OrderItem Table
CREATE TABLE OrderItem (
    order_item_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED,
    price DECIMAL(10,2),
    order_detail_id INT UNSIGNED,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (order_detail_id) REFERENCES OrderDetail(order_detail_id)
);

-- Creating Payment Table
CREATE TABLE Payment (
    payment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_detail_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status BOOLEAN,
    FOREIGN KEY (order_detail_id) REFERENCES OrderDetail(order_detail_id)
);

-- Creating SuperAdmin Table
CREATE TABLE SuperAdmin (
    admin_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
