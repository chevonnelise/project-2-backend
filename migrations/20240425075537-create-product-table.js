'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// the `up` function contains the changes that we want to make to the database
exports.up = function (db) {

  {/*
  CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    brand_id INT,
    category_id INT,
    FOREIGN KEY (brand_id) REFERENCES Brand(brand_id),
    FOREIGN KEY (category_id) REFERENCES ProductCategory(category_id)
)engine = innodb;
*/}

  // first argument: the name of the table
  // second argument: object that defines the columns of the table
  // (each key is one column)
  return db.createTable('products',{
    'id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'name':{
      'type':'string',
      'length':100,
      'notNull':true,
    },
    'description':{
      'type':'text'
    },
    'SKU':{
      'type':'string'
    },
    'price':{
      'type':'decimal',
      'unsigned':true
    },
    'quantity':{
      'type':'int'
    },
    'image_url':{
      'type':'string'
    },
    'created_at':{
      'type':'datetime'
    },
    'last_modified':{
      'type':'datetime'
    }
  })
};

// the `down` function reverts changes done to the database
exports.down = function (db) {
  return db.dropTable('products');
};

exports._meta = {
  "version": 1
};
