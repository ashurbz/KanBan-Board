import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import NavBar from "../components/NavBar";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateUserName,
} from "../utilities/validations";
import "./signIn.css";

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
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
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
      .then(() => {
        window.alert("Registration Successful, Please Login");
        navigate("/signin");
      })
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
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2>Sign Up</h2>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  isInvalid={errors.fullName ? true : false}
                  placeholder="Enter Full Name"
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
                  isInvalid={errors.userName ? true : false}
                  placeholder="Enter User Name"
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
                  isInvalid={errors.email ? true : false}
                  placeholder="Enter Email Address"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                {togglePassword ? (
                  <>
                    <Form.Control
                      type="input"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      isInvalid={errors.password ? true : false}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <div className="eye-open" onClick={handleTogglePassword}>
                      <FaEye />
                    </div>
                  </>
                ) : (
                  <>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      isInvalid={errors.password ? true : false}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <div className="eye-open" onClick={handleTogglePassword}>
                      <FaEyeSlash />
                    </div>
                  </>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  isInvalid={errors.confirmPassword ? true : false}
                  placeholder="Enter Confirm Password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign Up
              </Button>

              <Link to="/signin">
                <span style={{ position: "relative", left: "40%" }}>
                  Already Have Account? Please Sign In
                </span>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
