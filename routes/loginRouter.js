const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const message =
    req.query.account === "created"
      ? "Account successfully created! You can now log in!"
      : "";
  res.render("login", { message });
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=invalid",
  })
);

module.exports = loginRouter;
