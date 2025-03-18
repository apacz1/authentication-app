const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../db/queries");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await db.findUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
