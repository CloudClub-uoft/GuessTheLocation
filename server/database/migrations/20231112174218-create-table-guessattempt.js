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
    "guess_attempt",
    {
      userID: { type: "int", notNull: true },
      postID: { type: "int", notNull: true },
      guessID: { type: "int", notNull: true },
      locationLatGuess: { type: "float", notNull: true },
      locationLongGuess: { type: "float", notNull: true },
      score: { type: "int", notNull: true },
      timestamp: { type: "timestamp", notNull: true }
    },
    callback
  )
};

exports.down = function(db, callback) {
  db.dropTable("guess_attempt", callback)
};

exports._meta = {
  "version": 1
};
