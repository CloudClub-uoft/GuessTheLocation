const express = require('express');
require("dotenv").config();
const app = express();
const fileUpload = require("express-fileupload")
app.use(fileUpload())

// const s3client = require("./config/s3")
const s3Client = require("./config/s3setup")
app.set("view engine", "ejs")
// Pass s3client to POST-upload.js
require('./routes/POST-upload.js')(app, s3Client);
require('./routes/GET-upload.js')(app);

//app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// TODO: Configure database connections, authentication, and other application-level settings

// Middleware
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const guessRouter = require('./routes/guesses');
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/uath", authRouter);
app.use("/make_guess", guessRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;