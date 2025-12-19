import express from "express";
import knex from "knex";

const app = express();
const port = 3000;
const tasksFile = "./tasks.sqlite3";
const home = "./homepage";

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
  res.json(req.body);

  // Simple validation
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  await knexInstance("user").insert({ name, email }); // Adjust based on your schema
  res.status(201).send("User added successfully.");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
