import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from exercise 1!");
});

app.get("/currentYear", (req, res) => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  res.send(`It is ${currentYear}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
