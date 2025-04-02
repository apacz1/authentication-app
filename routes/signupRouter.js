const { Router } = require("express");
const signupController = require("../controllers/signupController");
const signupRouter = Router();

signupRouter.get("/", (req, res) => res.render("signup", { user: req.user }));
signupRouter.post("/", signupController.signupUser);

module.exports = signupRouter;
