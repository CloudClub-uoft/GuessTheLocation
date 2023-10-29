const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// TODO: Configure database connections, authentication, and other application-level settings

// Middleware
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/uath", authRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;