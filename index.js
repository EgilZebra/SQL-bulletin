
const database = require('./database/db');
const express = require('express');

const app = express();
database.initDatabase();

const users = require("./routes/users");
const notes = require("./routes/notes");
const channels = require("./routes/channels");

app.use(express.json());
app.use("/api/users", users );
app.use("/api/notes", notes );
app.use("/api/channels", channels );

const PORT = 9001;
const URL = "127.0.0.1";

app.listen(PORT, URL, () => {
  console.log("Bulletin Loaded!");
});