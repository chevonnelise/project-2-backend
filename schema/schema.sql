-- SQL Schema for MyNutriHealth
CREATE DATABASE superfoods;

USE superfoods;

-- Creating SuperAdmin Table
CREATE TABLE SuperAdmin (
    admin_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    country VARCHAR(45) NOT NULL,
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

-- Creating ShoppingSession Table
CREATE TABLE ShoppingSession (
    shopping_session_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating ProductCategory Table
CREATE TABLE ProductCategory (
    product_category_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) UNIQUE NOT NULL,
    description TEXT
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
    discount_id INT UNSIGNED,
    FOREIGN KEY (product_category_id) REFERENCES ProductCategory(product_category_id)
    FOREIGN KEY (brand_id) REFERENCES Brand(brand_id),
    FOREIGN KEY (review_id) REFERENCES Review(review_id),
    FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)
);

-- Creating Brand Table
CREATE TABLE Brand (
    brand_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45)
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

-- Creating OrderItem Table
CREATE TABLE OrderItem (
    order_item_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED,
    price DECIMAL(10,2),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (price) REFERENCES Product(price)
);

-- Creating Order Table
CREATE TABLE Order (
    order_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    total_amount DECIMAL(10,2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    discount_percentage DECIMAL(5,2),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (discount_percentage) REFERENCES Discount(discount_percentage),
    FOREIGN KEY (order_item_id) REFERENCES OrderItem(order_item_id)
);

-- Creating Payment Table

CREATE TABLE Payment (
    payment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_id INT UNSIGNED,
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status BOOLEAN,
    FOREIGN KEY (order_id) REFERENCES Order(order_id),
    FOREIGN KEY (total_amount) REFERENCES Order(total_amount)
);

-- Creating Discount Table
CREATE TABLE Discount (
    discount_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(45) UNIQUE,
    discount_percentage DECIMAL(5,2),
    expiration_date DATE,
    status BOOLEAN
);
