const express = require("express");
const cors = require("cors");
const friendsPlayingRoutes = require("./routes/friends-playing");

const app = express();
app.use(cors());

app.use("/friends-playing", friendsPlayingRoutes);

module.exports = app;
