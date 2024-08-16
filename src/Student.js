import React, { useEffect, useState } from "react";
import axios from "axios";

function Student() {
  //To display the data
  const [student, setStudent] = useState([]);

  //Fetch data from API database using Axios
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      // .then((res) => console.log(res))
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <button className="btn btn-success">Add +</button>
        <table className="table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* Display using map function */}
            {student.map((data, i) => (
              <tr key={i}>
                {/* <td>{data.ID}</td> */}
                <td>{data.Name}</td>
                <td>{data.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
