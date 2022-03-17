import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { ImFacebook2 } from "react-icons/im";
// import {useNavigate} from 'react-router-dom'
import "./register.css";
const Login = () => {
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
      const response = await fetch("http://localhost:3004/authors/login", {
        method: "POST",
        body: JSON.stringify(registration),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        setIsRegistered(true);
        // navigate('/')
        const authors = await response.json();
        localStorage.setItem("MyToken", authors.accessToken);
        setRegistration({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
      } else {
        console.log("Error while fetched!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          {isRegistered ? (
            <Alert variant="success" className="rounded-pill text-center">
              <FiCheckCircle /> Succesfully Logged in!
            </Alert>
          ) : (
            <div className="register-form">
              <Form onSubmit={handleSubmit}>
                <h1 className="text-center">
                  Sign in to <strong>StriveBlog!</strong>
                </h1>
                <div className="my-3 text-center">
                <a href="http://localhost:3004/authors/googleLogin">
                  <Button
                    variant="light"
                    style={{backgroundColor:"lightgrey"}}
                    className="mt-1 rounded-pill"
                  >
                    <FcGoogle style={{fontSize:"20px"}} />  
                  </Button>
                </a>
                <a href="http://localhost:3004/authors/googleLogin">
                  <Button
                    variant="light"
                    style={{backgroundColor:"lightgrey"}}
                    className="mt-1 rounded-pill"
                  >
                    <ImFacebook2 style={{fontSize:"20px"}} className="rounded-pill mb-1"/>   
                  </Button>
                </a>
                <a href="http://localhost:3004/authors/githubLogin">
                  <Button
                    variant="light"
                    style={{backgroundColor:"lightgrey"}}
                    className="mt-1 rounded-pill"
                  >
                    <SiGithub style={{fontSize:"20px"}} className="rounded-pill mb-1"/> 
                  </Button>
                </a>
                </div>
                <p className="text-center text-muted">or do via email</p>
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
                  Submit
                </Button>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
export default Login;
