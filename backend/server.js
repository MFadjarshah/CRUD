const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
//Past data to express.json
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

//GET method
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//POST method
// app.post("/create", (req, res) => {
//   const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
//   const values = [req.body.name, req.body.email];
//   db.query(sql, values, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
  const values = [req.body.name, req.body.email];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("SQL Error:", err); // Log the exact error
      return res.status(500).json({ message: "Database error", error: err }); // Send the error details in the response
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Listening...");
});
