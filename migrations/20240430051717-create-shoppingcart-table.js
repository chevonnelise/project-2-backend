'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

/**
 * We make changes that we want to make to the database in the up function.
 */
exports.up = function(db) {
  return db.createTable('ShoppingCart', {
    'shopping_cart_id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'quantity': {
      'type': 'int',
      'unsigned': true
    },
    'product_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'product_id_fk',
        'table': 'Product',
        'rules': {
          'onDelete': 'CASCADE',
          'onUpdate': 'CASCADE'
        },
        'mapping': 'product_id'
      }
    },
    'shopping_session_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'shopping_session_id_fk',
        'table': 'ShoppingSession',
        'rules': {
          'onDelete': 'CASCADE',
          'onUpdate': 'CASCADE'
        },
        'mapping': 'shopping_session_id'
      }
    },
    'created_at': {
      'type': 'datetime',
      'defaultValue': new String('CURRENT_TIMESTAMP')
    },
    'user_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'user_id_fk',
        'table': 'User',
        'rules': {
          'onDelete': 'RESTRICT',
          'onUpdate': 'RESTRICT'
        },
        'mapping': 'user_id'
      }
    }
  });
};

/**
 * We revert changes done to the database in the down function.
 */
exports.down = function(db) {
  return db.dropTable('ShoppingCart');
};

/**
 * We specify the version of the migration so that db-migrate knows how to execute it.
 */
exports._meta = {
  'version': 1
};
