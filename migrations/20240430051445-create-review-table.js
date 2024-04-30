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
  return db.createTable('Review', {
    'review_id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'username': {
      'type': 'string',
      'length': 45,
      'notNull': true,
      'unique': true
    },
    'product_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'product_id_fk',
        'table': 'Product',
        'rules': {
          'onDelete': 'RESTRICT',
          'onUpdate': 'RESTRICT'
        },
        'mapping': 'product_id'
      }
    },
    'rating': {
      'type': 'int',
      'unsigned': true
    },
    'comment': {
      'type': 'text'
    },
    'created_at': {
      'type': 'datetime',
      'defaultValue': new String('CURRENT_TIMESTAMP')
    }
  });
};

/**
 * We revert changes done to the database in the down function.
 */
exports.down = function(db) {
  return db.dropTable('Review');
};

/**
 * We specify the version of the migration so that db-migrate knows how to execute it.
 */
exports._meta = {
  'version': 1
};