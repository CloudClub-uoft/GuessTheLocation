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
    "user_profile",
    {
      userID: { type: "int", notNull: true },
      username: { type: "string", notNull: true },
      email: { type: "string", notNull: true },
      firstName: { type: "string", notNull: true },
      lastName: { type: "string", notNull: true },
      password: { type: "string", notNull: true },
      registrationTime: { type: "timestamp", notNull: true },
      emailVerified: { type: "boolean", notNull: true }
    },
    callback
  )
};

exports.down = function(db) {
  db.dropTable("user_profile", callback)
};

exports._meta = {
  "version": 1
};
