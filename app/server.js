const express = require("express");
const app = express();
const contacts = require("./contacts.json");

app.use(express.static("public"));

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Contact Book running on port 3000");
});
