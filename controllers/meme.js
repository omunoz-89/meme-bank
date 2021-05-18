const { response } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

router.get('/', (req,res) => {
  axios.get('https://api.imgflip.com/get_memes')
  .then(response => {
    let memes = response.data.data.memes
    // console.log(memes)
    res.render('meme', {meme:memes})
  })
})





module.exports = router;