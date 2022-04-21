import axios from "axios";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export function LoginSignup() {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
        staySignIn: false
    })
    const [error, setError] = useState('');
  const handleChange = (event) => {
      setError('');
      let typingElementValue = event.target.value;
      if (event.target.id === 'staySignIn') {
        typingElementValue = event.target.checked;
      }
    setLoginDetails({ ...loginDetails, [event.target.id]: typingElementValue });
  }
  const handleLogin = () => {
    const loginObject = {
        username: loginDetails.username,
        password: loginDetails.password
    };
    axios.post('http://localhost:8080/users/login', loginObject)
    .then(response => {
        if (response && response.data && !response.data.error) {
            sessionStorage.setItem('college-management-system-token', response.data.token);
            window.location.reload();
        } else {
            setError(response.data.message);
        }
    })
    .catch(err => {
        setError("Invalid Logins.  Please try with valid credentials.");
    })
  }
  return (
    <div style={{ margin: '2%'}}>
      <Row>
        <Col lg={4}>
            <h1>Login</h1>
            {error && <h5 style={{color: 'red'}}>{error}</h5>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={loginDetails.username} id="username" onChange={handleChange} placeholder="Enter Username" />
              <Form.Text className="text-muted">
                This is the username you entered while signing up.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={loginDetails.password} id="password" onChange={handleChange} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Stay Signed in" id="staySignIn" checked={loginDetails.staySignIn} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Col>
        <Col lg={1}></Col>
        <Col lg={7}>Signup</Col>
      </Row>
    </div>
  );
}
