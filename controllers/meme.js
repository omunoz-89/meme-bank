const { response } = require("express");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../models");
const fetch = require("node-fetch");
const isLoggedIn = require("../middleware/isLoggedIn");
require("dotenv").config();

router.get("/", async (req, res) => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const responseData = await response.json();
  const memes = await responseData.data.memes;
  const meme0 = await memes[0];
  res.render("meme", { meme: memes, meme0: meme0 });
});

router.post("/", isLoggedIn, async (req, res) => {
  const { memeId, top_text, bottom_text, private } = req.body;
  try {
    const response = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${memeId}&username=${process.env.IMG_USER}&password=${process.env.IMG_PASS}&text0=${top_text}&text1=${bottom_text}`
    );
    const responseData = await response.json();
    const img = responseData.data.url;
    if (img) {
      const addMeme = await db.meme.create({
        img_url: img,
        userId: req.user.id,
        private: private,
      });
      res.redirect("bank");
    }
  } catch (error) {
    console.log("------ Error ------");
    console.log(error);
  }
});

module.exports = router;
