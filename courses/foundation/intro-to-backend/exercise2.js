import express from "express";
import knex from "knex";

const app = express();
const port = 3005;
const tasksFile = "./tasks.sqlite3";

// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: tasksFile,
  },
  useNullAsDefault: true, // Omit warning in console
});

app.get("/", (req, res) => {
  res.send("Hello from exercise 2!");
});

// properly decoupled version of the /all-users route
async function getAllUsers() {
  return await knexInstance("user").select("*").orderBy("id", "asc");
}

app.get("/all-users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

app.use(express.json()); // Middleware to parse JSON bodies

// TODO implement more routes here
async function addUser(name, email) {
  return await knexInstance("user").insert({ name, email });
}

app.post("/users", async (req, res) => {
  const { name, email } = req.body; // Expecting JSON payload with name and email

  // Simple validation
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  try {
    await addUser(name, email);
    res.status(201).send("User added successfully.");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("An error occurred while adding the user");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
