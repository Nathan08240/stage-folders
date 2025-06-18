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

export default router;
