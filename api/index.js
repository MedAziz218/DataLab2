require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
// const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const page1Routes = require("./routes/page1");
const page2Routes = require("./routes/page2");
const page3Routes = require("./routes/page3");
const page4Routes = require("./routes/page4");

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
// app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/page1", page1Routes);
app.use("/api/page2", page2Routes);
app.use("/api/page3", page3Routes);
app.use("/api/page4", page4Routes);
//connection to db

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
