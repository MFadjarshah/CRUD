import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  //To display the data
  const [student, setStudent] = useState([]);
  // Loading and Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // API URL Management
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

  //Fetch data from API database using Axios
  useEffect(() => {
    axios
      .get(`${API_URL}`)
      // .then((res) => console.log(res))
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading students: {error.message}</p>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/student/${id}`);
      // window.location.reload();
      setStudent(student.filter((item) => item.ID !== id)); //Prevent Full Page Reload if use window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Display using map function */}
            {student.length === 0 ? ( //Conditional Rendering: handle cases when there are no students in the list
              <p>No students available</p>
            ) : (
              student.map((data, i) => (
                <tr key={i}>
                  <td>{data.Name}</td>
                  <td>{data.Email}</td>
                  <td>
                    <Link to={`update/${data.ID}`} className="btn btn-primary">
                      Update
                    </Link>
                    <Link
                      to={`view/${data.ID}`}
                      className="btn btn-success ms-2"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => handleDelete(data.ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
