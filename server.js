require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');


const SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('========= RES.LOCALS =================')
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', async (req, res) => {
  const memes = await db.meme.findAll({
    where:{
      private:false,
      copied: false,
    },
  include: [db.user]})
  res.render('index', {memes:memes});
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, first_name, last_name, user_name, email } = req.user.get();
  res.render('profile', { id, first_name, last_name, user_name, email });
});

app.post('/', isLoggedIn, async function (req,res) {
  const {memeUrl} = req.body;
  const [meme, created] = await db.meme.findOrCreate({
    where: {
      userId: req.user.id,
      img_url: memeUrl
    },
    defaults: {
      copied:true
    }
  })
  res.redirect('bank')
})

app.use('/auth', require('./controllers/auth'));
app.use('/meme', require('./controllers/meme'));
app.use('/bank', require('./controllers/bank'));




const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;