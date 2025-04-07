const db = require("../db/queries");

async function addMessage(req, res) {
  const { message } = req.body;
  const { msgTitle } = req.body;
  const userId = req.user.id;
  console.log(message, msgTitle, userId);

  try {
    await db.insertMessage(userId, msgTitle, message);

    return res.redirect("/");
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addMessage,
};
