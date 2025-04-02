const { Router } = require("express");
const premiumController = require("../controllers/premiumController");
const premiumRouter = Router();

premiumRouter.get("/", (req, res) => {
  const user = req.user;
  const message = req.session.message || null;

  res.render("premium", {
    user: user,
    message: message,
  });

  req.session.message = null;
  req.session.save();
});
premiumRouter.post("/", premiumController.changeMembership);

module.exports = premiumRouter;
