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

  router.post('/', async function (req,res) {
    const {memeId} = req.body;
    console.log(memeId)
    const deleteMeme = await db.meme.destroy({where:{id:memeId}})
    res.redirect('bank')
  })

  router.post('/private', async function (req,res) {
    const {privateId} = req.body;
    console.log(privateId)
    const findMeme = await db.meme.findOne({where:{id:privateId}})
    const update = await findMeme.update({private:true})
    res.redirect('/bank')
  })

  router.post('/public', async function (req,res) {
    const {publicId} = req.body;
    console.log(publicId)
    const findMeme = await db.meme.findOne({where:{id:publicId}})
    const update = await findMeme.update({private:false})
    res.redirect('/bank')
  })
  


module.exports = router;