const db = require("../db/queries");

async function changeMembership(req, res) {
  const { userInput } = req.body;
  const userId = req.user.id;

  try {
    const result = await db.updateMembership(userId, userInput);
    req.session.message = result.message;

    return res.redirect("/premium");
  } catch (error) {
    console.error("Error updating membership:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  changeMembership,
};
