const { Router } = require("express");
const signupRouter = Router();

signupRouter.get("/", (req, res) => res.render("signup"));

module.exports = signupRouter;
