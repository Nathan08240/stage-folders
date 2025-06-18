import mysql from "mysql2";

const config = {
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "test",
};

export const connection = mysql.createConnection(config);
