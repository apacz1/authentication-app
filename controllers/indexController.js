const db = require("../db/queries");

async function showAllMessages(req, res) {
  const user = req.user;
  try {
    const messages = await db.getAllMessages();
    return res.render("index", { messages, user });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { showAllMessages };
