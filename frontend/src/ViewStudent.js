import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

function ViewStudent() {
  const [student, setStudent] = useState(null); // Initialize with null (data might not be immediately available)
  const { id } = useParams(); // Get the student ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/view/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!student) return <p>Loading...</p>; // Display a loading message while fetching data

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2>Student Details</h2>
          <div className="mb-2">
            <label>Name: {student.Name}</label>
          </div>
          <div className="mb-2">
            <label>Email: {student.Email}</label>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")} // Use navigate to go back to the Student page
          >
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default ViewStudent;
