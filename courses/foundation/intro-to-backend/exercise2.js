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

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM user ORDER BY id ASC;");
  res.json(rows);
});

// TODO implement more routes here
app.post("/users", async (req, res) => {
  const { name, email } = req.body; // Expecting JSON payload with name and email

  // Simple validation
  if (!name || !email) {
    return res.status(400).send("Name and email are required.");
  }

  await knexInstance("user").insert({ name, email }); // Adjust based on your schema
  res.status(201).send("User added successfully.");
});

app.get("/home", (req, res) => {
  res.send("Welcome to the Home Page!");
});

app.get("/user-count", async (req, res) => {
  const result = await knexInstance.raw("SELECT COUNT(*) as count FROM user;");
  res.send(`
    <html>
    <head>
    <title>User Count</title>
    <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #a6d1a6ff;
            color: #333333ff;
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
    <h1>The Users Database</h1>
    <h3>
    The total users are <strong>${result[0].count}</strong>
    </h3>
    </body>
    </html>
    `);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
