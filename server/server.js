const express = require('express');
require("dotenv").config();
const app = express();

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
app.use("/auth", authRouter);
app.use("/make_guess", guessRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;