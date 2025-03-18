const pool = require("./pool");
const bcrypt = require("bcrypt");

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

module.exports = { addUser, findUsername, findUserById };
