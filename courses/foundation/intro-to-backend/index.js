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
  res.send("Hello! This is the Intro to Backend course exercise. Use the endpoints to interact with the database.");
});

// Route to get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await knexInstance.raw("SELECT * FROM task");
  res.json(tasks);
});

// Route to get all users
app.get("/users", async (req, res) => {
  const users = await knexInstance.raw("SELECT * FROM user");
  res.json(users);
});

// Route to add a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  await knexInstance("user")
    .insert({ name, email })
    .then(() => {
      res.status(201).send("User added successfully.");
    })
    .catch((err) => {
      res.status(500).send("Error adding user.");
    });
});

// Route to get user count with styled HTML response
app.get("/user-count", async (req, res) => {
  const result = await knexInstance.raw("SELECT COUNT(*) AS count FROM user");
  res.send(`
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
      <h3>The total users are <strong>${result[0].count}!</strong></h3>
      </body>
    </html>
  `);
});

// Route to delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params
  await knexInstance("user")
    .where({ id })
    .del()
    .then(() => {
      res.send(`User with ID ${id} deleted successfully.`)
      })
      .catch((err) => {
        res.status(500).send("Error deleting user.")
        })
        });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
