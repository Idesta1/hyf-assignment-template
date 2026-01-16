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

app.use(express.json());

// Basic route to check server status
app.get("/", (req, res) => {
  res.send(
    "Hello! This is the Intro to Backend course exercise. Use the endpoints to interact with the database."
  );
});

// Route to get all tasks
async function getAllTasks() {
  return await knexInstance.select("*").from("task");
}

app.get("/all-tasks", async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

// Route to get all users
async function getAllUsers() {
  return await knexInstance.select("*").from("user");
}

app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

// Route to add a new user
async function addUser(name, email) {
  return await knexInstance("user").insert({ name, email });
}

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  await addUser(name, email);
  res.status(201).send("User added successfully.");
});

// Route to get user count to process the result and return only the count
async function getUserCount() {
  try {
    const result = await knexInstance("user").count("id as count");
    const count =
      result && result[0] && result[0].count ? Number(result[0].count) : 0;
    return count;
  } catch (error) {
    console.error("Error fetching user count:", error);
    return 0;
  }
}

app.get("/user-count", async (req, res) => {
  const usersCount = await getUserCount();
  const page = renderUserCountPage(usersCount);
  res.send(page);
});

// Function to render only HTML page for user count
function renderUserCountPage(usersCount) {
  return `
      <html>
    <head>
    <title>User Count</title>
    <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #a6d1a6ff;
            color: #333333ff;
            margin-top: 50px;
            padding: 20px;
            text-align: center;
          }
          h1 {
            color: #4f58d9ff;
          }
          p {
            font-size: 18px;
          }
          strong {
            color: #000000ff; 
          }
        </style> 
        </head>
    <body>
      <h1>Database for User Count🎄</h1>
      <h3>The total users are <strong>${usersCount}!</strong></h3>
      </body>
    </html>
  `;
}

// Route to delete a user by ID
async function deleteUser(id) {
  return await knexInstance("user").where({ id }).delete();
}

//update the endpoint to call the function
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);

    if (deletedUser === 0) {
      return res.status(404).send(`User with ID ${id} not found.`);
    }

    res.send(`User with ID ${id} deleted successfully.`);
  } catch (error) {
    res.status(500).send("An error occurred while deleting the user.");
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
