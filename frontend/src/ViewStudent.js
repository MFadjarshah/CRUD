import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewStudent() {
  // Initialise State Variable to store the fetched data
  //   const [student, setStudent] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch Student Data Using "useEffect"
  // To get the ID we useParams
  const { id } = useParams();
  //   const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/${id}`)
      //   .then((res) => console.log(res))
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     // Use axios library to past the data
  //     axios
  //       .put("http://localhost:8081/update/" + id, { name, email })
  //       .then((res) => {
  //         console.log(res);
  //         //   Navigate back to home
  //         navigate("/");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2>Info Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name: {name}</label>
            {/* <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            /> */}
          </div>
          <div className="mb-2">
            <label htmlFor="">Email: {email}</label>
            {/* <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            /> */}
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default ViewStudent;
