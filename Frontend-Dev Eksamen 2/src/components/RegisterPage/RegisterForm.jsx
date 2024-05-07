import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { registerUser } from "../API/AuthAPI";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Reset previous error messages
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setApiError("");

      // Validate input name
      if (!name) {
        setNameError("Name is required");
        return;
      }

      // Validate input email
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      // Validate input password
      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      // Call registerUser function to register a new user
      const response = await registerUser({ name, email, password });
      console.log("Registration Response:", response);

      // Check if registration was successful
      if (response && response.data && response.data.email) {
        console.log("Registration successful!");
        // Redirect to venues page after successful registration - CHANGE THIS TO USER PAGE WHEN ITS CREATED
        window.location.href = "/venues";
      } else if (response && response.errors && response.errors.length > 0) {
        // Display API error message if any errors are present
        setApiError(response.errors[0].message);
      } else {
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="inputWidth">
          <Form.Group className="loginForm" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && (
              <Form.Text className="text-danger">{nameError}</Form.Text>
            )}
          </Form.Group>
          <br />

          <Form.Group className="loginForm" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <Form.Text className="text-danger">{emailError}</Form.Text>
            )}
          </Form.Group>
          <br />

          <Form.Group className="sm-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            )}
          </Form.Group>
          <br />
        </div>
        {apiError && <Form.Text className="text-danger">{apiError}</Form.Text>}

        <Button variant="primary" type="submit">
          Register
        </Button>
        <div>
          <br />
          <Form.Text className="text-muted">
            Already have an account? Log in!
          </Form.Text>
          <Link to="/login">
            <Button className="register-button" variant="primary">
              Log in
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
