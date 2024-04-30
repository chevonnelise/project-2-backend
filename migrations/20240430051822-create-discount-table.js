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
  return db.createTable('Discount', {
    'discount_id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'code': {
      'type': 'string',
      'length': 45,
      'unique': true
    },
    'discount_percentage': {
      'type': 'decimal',
      'precision': 5,
      'scale': 2
    },
    'expiration_date': {
      'type': 'date'
    },
    'status': {
      'type': 'boolean'
    }
  });
};

/**
 * We revert changes done to the database in the down function.
 */
exports.down = function(db) {
  return db.dropTable('Discount');
};

/**
 * We specify the version of the migration so that db-migrate knows how to execute it.
 */
exports._meta = {
  'version': 1
};
