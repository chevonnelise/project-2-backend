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
  return db.createTable('OrderItem', {
    'id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'id_fk',
        'table': 'Product',
        'rules': {
          'onDelete': 'RESTRICT',
          'onUpdate': 'RESTRICT'
        },
        'mapping': 'id'
      }
    },
    'quantity': {
      'type': 'int',
      'unsigned': true
    },
    'price': {
      'type': 'decimal',
      'precision': 10,
      'scale': 2
    },
    'id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'id_fk',
        'table': 'OrderDetail',
        'rules': {
          'onDelete': 'RESTRICT',
          'onUpdate': 'RESTRICT'
        },
        'mapping': 'id'
      }
    }
  });
};

/**
 * We revert changes done to the database in the down function.
 */
exports.down = function(db) {
  return db.dropTable('OrderItem');
};

/**
 * We specify the version of the migration so that db-migrate knows how to execute it.
 */
exports._meta = {
  'version': 1
};
