import { connection } from "./database.js";

const createTableVehicleQuery = `
    CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        make VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        color VARCHAR(30) NOT NULL
    );
`;

const createTableUserQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

const requests = [];

requests.push(createTableUserQuery);
requests.push(createTableVehicleQuery);

requests.forEach((query) => {
  connection.query(query, (err) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      console.log("Query executed successfully!");
    }
  });
});
