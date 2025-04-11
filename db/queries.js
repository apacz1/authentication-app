const pool = require("./pool");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function addUser(
  firstName,
  lastName,
  username,
  password,
  membershipStatus
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
            INSERT INTO users (first_name, last_name, username, password, membership_status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id;
        `;
    const values = [
      firstName,
      lastName,
      username,
      hashedPassword,
      membershipStatus,
    ];

    const result = await pool.query(query, values);

    return result.rows[0].id;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
}

async function findUsername(username) {
  try {
    const query = `
            SELECT * FROM users WHERE LOWER(username) = LOWER($1);
        `;
    const values = [username];

    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error finding user:", error.message);
    throw error;
  }
}

async function findUserById(id) {
  try {
    const query = `
            SELECT * FROM users WHERE id = $1;
        `;
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user:", error.message);
    throw error;
  }
}

async function updateMembership(userId, secretPassword) {
  const secretPasswords = {
    admin: process.env.SECRET_ADMIN,
    member: process.env.SECRET_MEMBER,
  };

  let newStatus = null;
  if (secretPassword === secretPasswords.admin) {
    newStatus = "admin";
  } else if (secretPassword === secretPasswords.member) {
    newStatus = "member";
  } else {
    return { success: false, message: "Incorrect secret password." };
  }

  const query = `UPDATE users SET membership_status = $1 WHERE id = $2 RETURNING *;`;

  try {
    const result = await pool.query(query, [newStatus, userId]);

    if (result.rowCount === 0) {
      return { success: false, message: "User not found." };
    }

    return { success: true, message: `Membership updated to ${newStatus}.` };
  } catch (error) {
    console.error("Error updating membership:", error.message);
    return { success: false, message: "Database error." };
  }
}

async function insertMessage(userId, title, content) {
  const query = `
    INSERT INTO messages (user_id, title, content)
    VALUES ($1, $2, $3) RETURNING *;
  `;

  try {
    const result = await pool.query(query, [userId, title, content]);
    console.log("Message inserted:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting message:", error);
  }
}

async function getAllMessages() {
  const query = `
    SELECT 
      m.id, 
      u.username, 
      m.title, 
      m.content, 
      TO_CHAR(m.timestamp, 'HH24:MI DD.MM.YYYY') AS formatted_date 
    FROM messages m
    JOIN users u ON m.user_id = u.id
    ORDER BY m.timestamp DESC;
  `;

  try {
    const result = await pool.query(query);
    //console.log("Retrieved messages:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

async function deleteMessageById(messageId) {
  const query = `DELETE FROM messages WHERE id = $1 RETURNING *;`;

  try {
    const result = await pool.query(query, [messageId]);

    if (result.rowCount === 0) {
      console.log(`No message found with id: ${messageId}`);
      return null;
    }

    console.log(`Deleted message:`, result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}

module.exports = {
  addUser,
  findUsername,
  findUserById,
  updateMembership,
  insertMessage,
  getAllMessages,
  deleteMessageById,
};
