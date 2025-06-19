import { connection } from "../database.js";
import { Router } from "express";

const router = Router();

router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

router.post("/user", (req, res) => {
  const { username, password, email } = req.body;
  const query =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  connection.query(query, [username, password, email], (err) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ message: "User created !", username, password, email });
  });
});

router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  const query =
    "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
  connection.query(query, [username, password, email, id], (err, results) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully!",
      username,
      password,
      email,
    });
  });
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully!" });
  });
});

export default router;
