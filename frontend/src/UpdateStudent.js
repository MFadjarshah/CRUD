import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //To get the ID we useParams
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading State

  useEffect(() => {
    axios
      .get(`${API_URL}/view/${id}`)
      .then((res) => {
        setName(res.data.Name);
        setEmail(res.data.Email);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (!name || !email) {
      // To ensure that both fields are not empty before submit
      alert("Please fill in both name and email.");
      return;
    }
    // Use axios library to past the data
    axios
      .put(`${API_URL}/update/${id}`, { name, email })
      .then((res) => {
        console.log(res);
        //   Navigate back to home
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update student. Please try again."); // Display error messages to the user if the update request fails.
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
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
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
