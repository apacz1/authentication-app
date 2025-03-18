const db = require("../db/queries");
const { validationResult, check } = require("express-validator");

const validateUser = [
  check("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name must contain only letters.")
    .bail()
    .isLength({ min: 3, max: 16 })
    .withMessage("First name needs to be between 3 and 16 characters."),
  check("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name must contain only letters.")
    .bail()
    .isLength({ min: 3, max: 16 })
    .withMessage("Last name needs to be between 3 and 16 characters."),
  check("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers.")
    .bail()
    .isLength({ min: 4, max: 16 })
    .withMessage("Username needs to be between 4 and 16 characters.")
    .bail()
    .custom(async (value) => {
      const user = await db.findUsername(value);
      if (user) {
        throw new Error("Username already exists.");
      }
    }),
  check("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password needs to be between 6 and 16 characters.")
    .bail()
    .isAlphanumeric()
    .withMessage("Password must contain only letters and numbers."),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

const signupUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
      });
    }
    await db.addUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.password,
      "guest"
    );
    res.redirect("/login?account=created");
  },
];

module.exports = { signupUser };
