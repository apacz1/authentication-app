const { Client } = require("pg");

const SQL = `
    -- Drop tables if they exist
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users;

    -- Create the users table
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        membership_status VARCHAR(20) NOT NULL CHECK (membership_status IN ('guest', 'member', 'admin'))
    );

    -- Create the messages table
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        content TEXT NOT NULL
    );
`;

async function main() {
  const client = new Client({
    connectionString: process.argv[2],
  });

  try {
    console.log("Connecting to database...");
    await client.connect();

    console.log("Executing SQL...");
    await client.query(SQL);

    console.log("Schema created successfully!");
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    await client.end();
    console.log("Done");
  }
}

main();
