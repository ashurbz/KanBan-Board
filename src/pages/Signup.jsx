import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateUserName,
} from "../utilities/validations";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //Validate inputs
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);
    const confirmPasswordValid = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    const nameValid = validateName(formData.fullName);
    const userNameValid = validateUserName(formData.userName);

    if (!emailValid) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return;
    }

    if (!passwordValid) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters long",
      });
      return;
    }

    if (!confirmPasswordValid) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }

    if (!nameValid) {
      setErrors({ ...errors, fullName: "Name must be valid" });
      return;
    }
    if (!userNameValid) {
      setErrors({ ...errors, userName: "User Name must be valid" });
      return;
    }

    axios
      .post(`http://localhost:9000/users`, formData)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    setFormData({
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container mt-5">
      <NavBar />
      <h2 className="mb-6 mt-4">Sign Up</h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            isInvalid={!!errors.userName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.userName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
