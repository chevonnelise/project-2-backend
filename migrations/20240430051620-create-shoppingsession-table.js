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
  return db.createTable('ShoppingSession', {
    'shopping_session_id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'total': {
      'type': 'decimal',
      'precision': 10,
      'scale': 2
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
  return db.dropTable('ShoppingSession');
};

/**
 * We specify the version of the migration so that db-migrate knows how to execute it.
 */
exports._meta = {
  'version': 1
};
