require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("./controllers/passport");

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const premiumRouter = require("./routes/premiumRouter");
const messageRouter = require("./routes/messageRouter");
const deleteRouter = require("./routes/deleteRouter");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/premium", premiumRouter);
app.use("/message", messageRouter);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.use("/delete", deleteRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
