const { response } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');



  router.get("/", isLoggedIn, async function (req, res) {
    const findMemes = await db.meme.findAll({
      where:{userId: req.user.id}});
    res.render("bank", {memes: findMemes });
  });

  


module.exports = router;