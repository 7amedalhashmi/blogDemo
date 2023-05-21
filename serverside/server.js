const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/BlogRoute")

const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));