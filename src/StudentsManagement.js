import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import StudentCard from "./StudentCard";

import AddStudentForm from './AddStudentForm';
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function App1() {
  const [showForm, setShowForm] = useState(false);
  const dummyStudentObject = {
    name: "",
    email: 0,
    dob: "",
    gender: "",
    branch: "",
  };
//   const [isEdit, setEdit] = useState(false);
  const [newStudent, setNewStudent] = useState({ ...dummyStudentObject });
  const token = sessionStorage.getItem('college-management-system-token');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}`} };
  
  const students = useSelector(store => store.studentsReducer.students);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:8080/students", axiosConfig)
      .then((response) => {
        if (response && response.data) {
          dispatch({ type: 'LOAD_STUDENTS', data: response.data });
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  }, []);

  const addStudent = () => {
    axios
      .post("http://localhost:8080/students", newStudent, axiosConfig)
      .then((response) => {
        if (response && response.data) {
          dispatch({ type: 'ADD_STUDENT', data: response.data });
          setNewStudent({ ...dummyStudentObject });  //empty the new stdent object
          setShowForm(false); //hide the form
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  };

  const editStudent = (id) => {
    axios
      .get(`http://localhost:8080/students/${id}`, axiosConfig)
      .then((response) => {
        if (response && response.data) {
          // setEdit(true);
          setNewStudent(response.data);
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:8080/students/${id}`, axiosConfig)
      .then((response) => {
        if (response && response.data) {
          //filter the deleted student here
          dispatch({ type: 'DELETE_STUDENT', id: id });
        }
      })
      .catch((err) => {
        console.log(err, "here is my error");
      });
  };

  const logout = () => {
    sessionStorage.removeItem('college-management-system-token');
    window.location.reload()
  };

  const handleChange = (key, value) => {
    setNewStudent({ ...newStudent, [key]: value });
  }

  return (
    <div>
      <h1>
        Students List{" "}
        {showForm === false && (
          <button onClick={() => setShowForm(true)}>Add New</button>
        )}
        <button onClick={logout}>Logout</button>
      </h1>
      <Row>
        <Col lg={5}>
          <AddStudentForm handleChange={handleChange} handleAdd={addStudent} newStudent={newStudent} />
        </Col>
        <Col lg={7}>
        {students.map((student) => (
          <StudentCard student={student} handleEdit={editStudent} handleDelete={deleteStudent} />
        ))}
        </Col>
      </Row>
    </div>
  );
}
