const { Router } = require("express");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const message =
    req.query.account === "created"
      ? "Account successfully created! You can now log in!"
      : "";
  res.render("login", { message });
});

module.exports = loginRouter;
