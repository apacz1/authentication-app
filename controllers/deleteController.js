const db = require("../db/queries");

async function deleteMessage(req, res) {
  const msgId = req.params.id;
  console.log(msgId);
  try {
    await db.deleteMessageById(msgId);
    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  deleteMessage,
};
