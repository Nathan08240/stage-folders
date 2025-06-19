import { connection } from "../database.js";
import { Router } from "express";

const router = Router();

router.get("/vehicles", (req, res) => {
  connection.query("SELECT * FROM vehicles", (err, results) => {
    if (err) {
      console.error("Error fetching vehicles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

router.get("/vehicle/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM vehicles WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching vehicles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

router.post("/vehicle", (req, res) => {
  const { make, model, year, color } = req.body;
  const query =
    "INSERT INTO vehicles (make, model, year, color) VALUES (?, ?, ?, ?)";
  connection.query(query, [make, model, year, color], (err) => {
    if (err) {
      console.error("Error inserting vehicle:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ message: "Vehicle created !", make, model, year, color });
  });
});

router.put("/vehicle/:id", (req, res) => {
  const { id } = req.params;
  const { make, model, year, color } = req.body;
  const query =
    "UPDATE vehicles SET make = ?, model = ?, year = ?, color = ? WHERE id = ?";
  connection.query(query, [make, model, year, color, id], (err, results) => {
    if (err) {
      console.error("Error updating vehicle:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json({
      message: "Vehicle updated successfully!",
      make,
      model,
      year,
      color,
    });
  });
});

router.delete("/vehicle/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM vehicles WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting vehicle:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully!" });
  });
});

export default router;
