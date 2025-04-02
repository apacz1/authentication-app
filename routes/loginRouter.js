const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const message =
    req.query.account === "created"
      ? "Account successfully created! You can now log in!"
      : "";
  const error =
    req.query.error === "invalid" ? "Invalid username or password." : "";
  res.render("login", { message, error, user: req.user });
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=invalid",
  })
);

module.exports = loginRouter;
