const { response } = require("express");
const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "See you next time...");
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome back ...",
    failureFlash: "Either email or password is incorrect. Please try again",
  })
);

router.post("/signup", async (req, res) => {
  const { first_name, last_name, user_name, email, password } = req.body;
  try {
    const [user, created] = await db.user.findOrCreate({
      where: { user_name },
      defaults: { first_name, last_name, email, password },
    });
    if (created) {
      console.log(`------${user.user_name} was created------`);
      const successObject = {
        successRedirect: "/",
        successFlash: `Welcome ${user.user_name}. Account was created.`,
      };
      passport.authenticate("local", successObject)(req, res);
    } else {
      req.flash("error", "User name already exists");
      res.redirect("/auth/signup");
    }
  } catch (error) {
    console.log("------ Error ------");
    console.log(error);
    req.flash(
      "error",
      "Either email or password is incorrect. Please try again."
    );
    res.redirect("/auth/signup");
  }
});

module.exports = router;
