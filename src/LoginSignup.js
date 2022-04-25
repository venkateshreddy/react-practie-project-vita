import axios from "axios";
import { useState } from "react";
import { Form, Button, Row, Col, DropdownButton } from "react-bootstrap";

export function LoginSignup() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    staySignIn: false,
  });
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    name: "",
    email: "",
    gender: "",
    dob: "",
    qualification: "", //employee
    designation: "", //employee
    branch: "", //student
  });
  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");
  const handleLoginChange = (event) => {
    setError("");
    let typingElementValue = event.target.value;
    if (event.target.id === "staySignIn") {
      typingElementValue = event.target.checked;
    }
    setLoginDetails({ ...loginDetails, [event.target.id]: typingElementValue });
  };
  const handleChange = (event) => {
    console.log(event, event.target.id, event.target.value);
    setError("");
    setSignupDetails({
      ...signupDetails,
      [event.target.id]: event.target.value,
    });
  };
  const handleLogin = () => {
    const loginObject = {
      username: loginDetails.username,
      password: loginDetails.password,
    };
    axios
      .post("http://localhost:8080/users/login", loginObject)
      .then((response) => {
        if (response && response.data && !response.data.error) {
          sessionStorage.setItem(
            "college-management-system-token",
            response.data.token
          );
          window.location.reload();
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError("Invalid Logins.  Please try with valid credentials.");
      });
  };
  const handleSignup = () => {
    if (
      !signupDetails.password ||
      signupDetails.password !== signupDetails.confirmPassword
    ) {
      setSignupError(
        "Please enter valid password and make sure confirm password is same as password"
      );
      return false;
    }
    const userObject = {
      username: signupDetails.username,
      password: signupDetails.password,
      role: signupDetails.role,
    };
    axios
      .post("http://localhost:8080/users/signup", userObject)
      .then((response) => {
        if (response && response.data && response.data._id) {
          const mainObject = {
            userId: response.data._id,
            name: signupDetails.name,
            email: signupDetails.email,
            gender: signupDetails.gender,
            dob: signupDetails.dob
          };
          if (signupDetails.role === 'STUDENT') {
            mainObject. branch = signupDetails.branch;
          } else if (signupDetails.role === 'FACULTY') {
            mainObject.qualification= signupDetails.qualification;
            mainObject.designation = signupDetails.designation;
            mainObject.employeeType = 'Teaching'
          } else {
            mainObject.qualification= signupDetails.qualification;
            mainObject.employeeType = 'Non-Teaching'
          };
          let createUrl = "http://localhost:8080/students";
          if (signupDetails.role !== 'STUDENT') {
            createUrl = "http://localhost:8080/employees"
          }
          axios.post(createUrl, mainObject)
          .then(response => {
            alert("Signup Successfull. Please login.");
            window.location.reload()
          })
          .catch(err => console.log(err))
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError("Invalid Logins.  Please try with valid credentials.");
      });
  };
  return (
    <div style={{ margin: "2%" }}>
      <Row>
        <Col lg={4}>
          <h1>Login</h1>
          {error && <h5 style={{ color: "red" }}>{error}</h5>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={loginDetails.username}
                id="username"
                onChange={handleLoginChange}
                placeholder="Enter Username"
              />
              <Form.Text className="text-muted">
                This is the username you entered while signing up.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={loginDetails.password}
                id="password"
                onChange={handleLoginChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Stay Signed in"
                id="staySignIn"
                checked={loginDetails.staySignIn}
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Col>
        <Col lg={1}></Col>
        <Col lg={7}>
          <h1>Signup</h1>
          {signupError && <h5 style={{ color: "red" }}>{signupError}</h5>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={signupDetails.username}
                id="username"
                onChange={handleChange}
                placeholder="Enter Username"
              />
              <Form.Text className="text-muted">
                This is the username you entered while signing up.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={signupDetails.password}
                id="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={signupDetails.confirmPassword}
                id="confirmPassword"
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role</Form.Label>
              <select onChange={handleChange} id="role">
                <option>Select</option>
                <option value="STUDENT">STUDENT</option>
                <option value="FACULTY">FACULTY</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={signupDetails.name}
                id="name"
                onChange={handleChange}
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={signupDetails.email}
                id="email"
                onChange={handleChange}
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={signupDetails.gender}
                id="gender"
                onChange={handleChange}
                placeholder="Gender"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={signupDetails.dob}
                id="dob"
                onChange={handleChange}
                placeholder="Date of Birth"
              />
            </Form.Group>
            {(signupDetails.role === "FACULTY" ||
              signupDetails.role === "ADMIN") && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  value={signupDetails.qualification}
                  id="qualification"
                  onChange={handleChange}
                  placeholder="qualification"
                />
              </Form.Group>
            )}
            {signupDetails.role === "FACULTY" && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  value={signupDetails.designation}
                  id="designation"
                  onChange={handleChange}
                  placeholder="designation"
                />
              </Form.Group>
            )}
            {signupDetails.role === "STUDENT" && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  value={signupDetails.branch}
                  id="branch"
                  onChange={handleChange}
                  placeholder="Branch"
                />
              </Form.Group>
            )}
            <Button variant="primary" onClick={handleSignup}>
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
