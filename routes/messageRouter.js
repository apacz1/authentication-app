const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }
  res.render("message", { user: req.user });
});

messageRouter.post("/", messageController.addMessage);

module.exports = messageRouter;
