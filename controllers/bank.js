const { response } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

router.get('/', (req, res) => {
    res.render('bank');
  });

  // router.get("/:id", async function (req, res) {
  //   const findMeme = await db.bank.findOne({where:{memeId:req.params.id}});
  //   const memeUrl = await db.meme.findOne({where:{id:req.findMeme}})
  //   res.render("show", { memeUrl });
  // });


module.exports = router;