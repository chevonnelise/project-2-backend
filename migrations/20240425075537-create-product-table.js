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
  return db.createTable('Product', {
    'product_id': {
      'type': 'int',
      'primaryKey': true,
      'autoIncrement': true,
      'unsigned': true
    },
    'name': {
      'type': 'string',
      'length': 45,
      'notNull': true,
      'unique': true
    },
    'description': {
      'type': 'text'
    },
    'sku': {
      'type': 'string',
      'length': 255,
      'notNull': true,
      'unique': true
    },
    'price': {
      'type': 'decimal',
      'precision': 10,
      'scale': 2
    },
    'quantity': {
      'type': 'int',
      'unsigned': true
    },
    'image_url': {
      'type': 'string',
      'length': 255,
      'notNull': true,
      'unique': true
    },
    'created_at': {
      'type': 'datetime',
      'defaultValue': new String('CURRENT_TIMESTAMP')
    },
    'last_modified': {
      'type': 'datetime',
      'defaultValue': new String('CURRENT_TIMESTAMP')
    },
    'product_category_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'product_category_id_fk',
        'table': 'ProductCategory',
        'rules': {
          'onDelete': 'RESTRICT',
          'onUpdate': 'RESTRICT'
        },
        'mapping': 'product_category_id'
      }
    },
    'brand_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'brand_id_fk',
        'table': 'Brand',
        'rules': {
          'onDelete': 'CASCADE',
          'onUpdate': 'CASCADE'
        },
        'mapping': 'brand_id'
      }
    },
    'review_id': {
      'type': 'int',
      'unsigned': true,
      'foreignKey': {
        'name': 'review_id_fk',
        'table': 'Review',
        'rules': {
          'onDelete': 'CASCADE',
          'onUpdate': 'CASCADE'
        },
        'mapping': 'review_id'
      }
    }
  });
};

/**
 * We revert changes done to the database in the down function.
 */
exports.down = function(db) {
  return db.dropTable('Product');
};

/**
 * We specify the version of the migration so that db-migrate knows how to execute it.
 */
exports._meta = {
  'version': 1
};
