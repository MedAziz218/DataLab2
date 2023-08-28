const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
dotenv.config(process.env.MONGO_URL);
console.log();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to dd0dd00MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// Middle Ware
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))



// Routes
app.use("/api/users",usersRoute)
app.use("/api/auth",authRoute)

  



app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/users", (req, res) => {
    res.send("Hello, users!");
  });
app.listen(port, () => {
  console.log(`Server is runnding on port ${port}`);
});
