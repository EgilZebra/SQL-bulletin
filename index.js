
const database = require('./database/db');
const express = require('express');



 const app = express();
app.use(express.json()); 


const PORT = 9001;
const URL = "127.0.0.1";




const db = database.initDatabase();





/* routes app.use */









app.listen(PORT, URL, () => {
  console.log("Bulletin Loaded!");
});