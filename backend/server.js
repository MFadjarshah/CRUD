const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
//Past data to express.json
//Middleware for Parsing JSON
app.use(express.json());

app.use(cors());

// Connect to MySQL
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "crud",
// });

// For larger applications, consider using a connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

// GET Method (Fetch All Students)
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// POST Method (Create Student)
app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// PUT Method (Update Student)
app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET Name=?, Email=? WHERE ID=?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// GET Method for Single Student (View Student)
app.get("/view/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE ID=?";
  const id = req.params.id;

  // Debugging: Log the query and parameters
  console.log(`Executing query: ${sql} with ID: ${id}`);

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("SQL Error:", err); // Log the exact error
      return res
        .status(500)
        .json({ message: "Database query error", error: err });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(data[0]);
  });
});

//DELETE Method
app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID=?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
