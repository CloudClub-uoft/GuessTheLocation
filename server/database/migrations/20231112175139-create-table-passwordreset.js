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

exports.up = function(db, callback) {
  db.createTable(
    "password_reset",
    {
      requestID: { type: "int", notNull: true },
      email: { type: "string", notNull: true },
      newPassword: { type: "string", notNull: true },
      resetTime: { type: "timestamp", notNull: true }
    },
    callback
  )
};

exports.down = function(db, callback) {
  db.dropTable("password_reset", callback)
};

exports._meta = {
  "version": 1
};
