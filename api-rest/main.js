import e from "express";
import { connection } from "./database.js";
import vehiclesRouter from "./routes/vehicles.js";
import usersRouter from "./routes/users.js";

const app = e();
const port = 3000;

app.use(e.json());

app.use("/", vehiclesRouter);
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database successfully!");
});

export default app;
