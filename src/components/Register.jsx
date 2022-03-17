import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
// import {useNavigate} from 'react-router-dom'
import "./register.css";
const Register = () => {
  // const navigate = useNavigate()
  const [isRegistered, setIsRegistered] = useState(false);
  const [registration, setRegistration] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleInput = (fieldName, value) => {
    setRegistration({
      ...registration,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3004/authors/register", {
        method: "POST",
        body: JSON.stringify(registration),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        setIsRegistered(true);
        // navigate('/')
        setRegistration({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
      } else {
        console.log("Error while fetched!");
      }
    } catch (error) {}
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          {isRegistered ? (
            <Alert variant="success" className="rounded-pill text-center">
              <FiCheckCircle /> Succesfully registered!
            </Alert>
          ) : (
            <div className="register-form">
              <Form onSubmit={handleSubmit}>
                <h1>
                  <strong>Registration!</strong>
                </h1>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    className="rounded-pill"
                    type="text"
                    placeholder="Enter your name"
                    value={registration.first_name}
                    onChange={(e) => {
                      handleInput("first_name", e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    className="rounded-pill"
                    type="text"
                    placeholder="Enter your lastname"
                    value={registration.last_name}
                    onChange={(e) => {
                      handleInput("last_name", e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className="rounded-pill"
                    type="email"
                    placeholder="Enter email"
                    value={registration.email}
                    onChange={(e) => {
                      handleInput("email", e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="rounded-pill"
                    type="password"
                    placeholder="Password"
                    value={registration.password}
                    onChange={(e) => {
                      handleInput("password", e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: "100%" }}
                  className="mt-3 rounded-pill"
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
export default Register;
