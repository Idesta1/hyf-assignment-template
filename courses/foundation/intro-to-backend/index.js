import express from "express";
import knex from "knex";


const app = express();
const PORT = 3000;
const tasksFile = "./tasks.sqlite3";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: tasksFile,
  },
  useNullAsDefault: true,
});

app.get("/", (req, res) => {
  res.send("Hello this is my homepage!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
