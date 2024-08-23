const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
//Past data to express.json
//Middleware for Parsing JSON
app.use(express.json());

app.use(cors());

// Connect to MySQL
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

app.get("/:id", (req, res) => {
  const id = req.params.id;
  // Logic to find the student by ID and return it
  // Example:
  const student = database.find((student) => student.id === parseInt(id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
});

//POST method
app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//CODE from chatgpt
// app.post("/create", (req, res) => {
//   const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
//   const values = [req.body.name, req.body.email];

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("SQL Error:", err); // Log the exact error
//       return res.status(500).json({ message: "Database error", error: err }); // Send the error details in the response
//     }
//     return res.json(data);
//   });
// });

//PUT method
app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET Name=?, Email=? WHERE ID=?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//   //CODE from chatgpt
//   db.query(sql, [...values, id], (err, data) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json(err); // Return status 500 for server errors
//     }
//     return res.status(200).json(data); // Return status 200 for successful update
//   });
// });

//DELETE method
app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID=?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("Listening...");
});
