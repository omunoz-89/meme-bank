const { response } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const fetch = require('node-fetch');


router.get('/', async (req,res) => {
  const response = await fetch('https://api.imgflip.com/get_memes');
  const responseData = await response.json();
  const memes = await responseData.data.memes
  const meme0 = await memes[0]
    // console.log(memeImg)
    res.render('meme', {meme:memes, meme0:meme0})

})

router.post('/', async (req,res) => {
  const {template,top_text,bottom_text} = req.body;
  console.log(req.body)
})



module.exports = router;