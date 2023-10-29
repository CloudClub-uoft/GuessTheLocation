const db = require('../config/db');
const s3Client = require("../config/s3");

const getUsers = (req, res) => {
  res.send('List of users');
}

const getUserWithId = (req, res) => {
    const userId = req.params.id;
    res.send(`Details of user ${userId}`);
}

const createUser = (req, res) => {
const userId = req.params.userId;
res.send(`Details of post ${userId}`);
}

const deleteUserWithId = (req, res) => {
    const userId = req.params.userId;
    res.send(`Delete user with id = ${postId}`);
}

module.exports = {
    getUsers,
    getUserWithId,
    createUser,
    deleteUserWithId,
}