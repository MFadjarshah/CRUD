import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading State

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (!name || !email) {
      alert("Please fill in both name and email.");
      return;
    }
    // Use axios library to past the data
    axios
      .post(`${API_URL}/create`, { name, email })
      .then((res) => {
        console.log(res);
        // Navigate back to home
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create student. Please try again."); // Consider displaying error messages
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
