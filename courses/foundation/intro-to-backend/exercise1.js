import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from exercise 1!");
});

app.get("/currentYear", (req, res) => {
  // 1- argument processing can be done here if needed(read data, check if it is valid)

  // 2- action / logic can be done here
  const currentYear = new Date().getFullYear();

  // 3- response formation
  res.json({
    year: currentYear,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
