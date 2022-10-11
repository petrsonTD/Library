require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const libraryRoutes = require("./routes/libraries");
const studentRoures = require("./routes/students");
const bookRoures = require("./routes/books");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/libraries", libraryRoutes);
app.use("/api/students", studentRoures);
app.use("/api/books", bookRoures);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
