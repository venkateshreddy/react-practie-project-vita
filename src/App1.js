import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import StudentCard from "./StudentCard";

function App1() {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const dummyStudentObject = {
    name: "",
    email: 0,
    dob: "",
    gender: "",
    branch: "",
  };
  const [newStudent, setNewStudent] = useState({ ...dummyStudentObject });

  useEffect(() => {
    axios
      .get("http://localhost:8080/students")
      .then((response) => {
        if (response && response.data) {
          setStudents(response.data);
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  }, []);

  const handleChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.id]: event.target.value });
  };

  const addStudent = () => {
    axios
      .post("http://localhost:8080/students", newStudent)
      .then((response) => {
        if (response && response.data) {
          setStudents([...students, response.data]); //append new student to the list
          setNewStudent({ ...dummyStudentObject });  //empty the new stdent object
          setShowForm(false); //hide the form
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:8080/students/${id}`)
      .then((response) => {
        if (response && response.data) {
          //filter the deleted student here
          setStudents(students.filter(stu => stu._id !== id));
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  };

  return (
    <div>
      <h1>
        Students List{" "}
        {showForm === false && (
          <button onClick={() => setShowForm(true)}>Add New</button>
        )}
      </h1>
      {showForm && (
        <div>
          <h2>Enter New Student Details</h2>
          <div>
            <label>Name:</label>
            <input
              type={"text"}
              id="name"
              value={newStudent.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type={"text"}
              id="email"
              value={newStudent.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>dob:</label>
            <input
              type={"date"}
              id="dob"
              value={newStudent.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type={"text"}
              id="gender"
              value={newStudent.gender}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Branch:</label>
            <input
              type={"text"}
              id="branch"
              value={newStudent.branch}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={() => setShowForm(false)}>Cancel</button>
            <button onClick={addStudent}>Submit</button>
          </div>
        </div>
      )}
      {students.map((student) => (
        <StudentCard student={student} handleDelete={deleteStudent} />
      ))}
    </div>
  );
}

export default App1;
