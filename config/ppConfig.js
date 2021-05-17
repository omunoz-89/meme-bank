const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models'); //Database

const STRATEGY = new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'password'
}, async (user_name, password, cb) => {
    try {
        const user = await db.user.findOne({
            where: { user_name}
        });
        if (!user || !user.validPassword(password)) {
            cb(null,false);
        } else {
            cb(null,user);
        }
    } catch (err) {
        console.log('------ Error below ------');
        console.log(err);
    }
});

passport.serializeUser((user,cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id,cb) => {
  try {
      const user = await db.user.findByPk(id);

      if (user) {
          cb(null,user)
      }
  } catch (err) {
      console.log('------ Yo...There is an error ------');
      console.log(err);
  }
});

passport.use(STRATEGY);


module.exports = passport;