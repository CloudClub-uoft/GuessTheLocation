const db = require('../config/db');
const s3Client = require("../config/s3");

const register = (req, res) => {
    res.send("register");
}

const login = (req, res) => {
    res.send("login");
}

const logout = (req, res) => {
    res.send("logout");
}

module.exports = {
    register,
    login,
    logout,
}
