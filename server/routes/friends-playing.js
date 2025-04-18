require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = process.env.API_KEY;
const STEAM_ID = process.env.STEAM_ID;

router.get("/", async (req, res) => {
  try {
    const friendsRes = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${API_KEY}&steamid=${STEAM_ID}`
    );

    const friendIDs = friendsRes.data.friendslist.friends.map(f => f.steamid);

    const summariesRes = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${friendIDs.join(
        ","
      )}`
    );

    const friends = summariesRes.data.response.players.map(player => ({
      name: player.personaname,
      game: player.gameextrainfo || null,
      avatar: player.avatarfull,
    }));

    res.json(friends);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching friends data");
  }
});

module.exports = router;
