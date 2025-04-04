const { Router } = require("express");
const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  //   const user = req.user;
  //   if (!user) {
  //     return res.redirect("/login");
  //   }
  res.render("message", { user: req.user });
});

module.exports = messageRouter;
