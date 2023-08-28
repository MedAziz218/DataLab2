require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package

const DB_CONNECTION_TIMEOUT = 5000;
const DB_HEARTBEAT_INTERVAL = 5000;
const APP_PORT = 3001;
const app = express();
app.use(cors());

const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
// const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const formValidityRoutes = require("./routes/form");

const page1Routes = require("./routes/page1");
const page2Routes = require("./routes/page2");
const page3Routes = require("./routes/page3");
// const page4Routes = require("./routes/page4");
const page5Routes = require("./routes/page5");
const page6Routes = require("./routes/page6");

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// routes
// app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/page1", page1Routes);
app.use("/api/page2", page2Routes);
app.use("/api/page3", page3Routes);
// app.use("/api/page4", page4Routes);
app.use("/api/page5", page5Routes);

app.use("/api/page6", page6Routes);
app.use("/api/form", formValidityRoutes);

//connection to db

const dbConnectionPromise = new Promise((resolve, reject) => {
  console.log("Trying to Connect to DxxataBase");

  const connectWithRetry = () => {
    return mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };

  connectWithRetry()
    .then(() => {
      console.log("Connected to MongoDB");
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

const startServer = () => {
  const server = app.listen(APP_PORT, () => {
    console.log("Server is runsning on port 3001");
  });

  const db = mongoose.connection;

  setInterval(() => {
    if (db.readyState !== 1) {
      console.log("Lost connection to MongoDB. Exiting...");
      server.close(() => {
        console.log("Server closed due to lost database connection.");
        process.exit(1);
      });
    }
  }, DB_HEARTBEAT_INTERVAL); // Check every 5 seconds
};

Promise.race([
  dbConnectionPromise,

  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Database connection timeout"));
    }, DB_CONNECTION_TIMEOUT); // 4 seconds
  }),
])
  .then(startServer)
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
