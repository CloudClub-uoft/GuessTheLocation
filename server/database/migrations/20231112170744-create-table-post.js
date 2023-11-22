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
    "post",
    {
      userID: { type: "int", notNull: true },
      postID: { type: "int", notNull: true },
      locationLat: { type: "float", notNull: true },
      locationLong: { type: "float", notNull: true },
      postTime: { type: "timestamp", notNull: true }
    },
    callback
  )
};

exports.down = function(db, callback) {
  db.dropTable("post", callback)
};

exports._meta = {
  "version": 1
};
