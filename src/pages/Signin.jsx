import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../redux/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./signIn.css";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    userNameOrEmail: "",
    password: "",
    captcha: "",
  });
  const [captchNumber, setCaptchaNumber] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  useEffect(() => {
    function generateRandomNumber() {
      return (Math.floor(Math.random() * 9000) + 1000).toString();
    }
    setCaptchaNumber(generateRandomNumber());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:9000/users`).then((result) => {
      result.data.map((user) => {
        console.log(user);
        if (
          user.email == loginData.userNameOrEmail ||
          user.userName == loginData.userNameOrEmail
        ) {
          if (user.password == loginData.password) {
            if (loginData.captcha !== captchNumber) {
              window.alert("Captch is not verified");
              return;
            }
            dispatch(userDetails(user.fullName));
            window.alert("Login successful");
          } else {
            window.alert("password or email incorrect");
          }
        }
      });
    });

    navigate("/dashboard");
    setLoginData({
      userNameOrEmail: "",
      password: "",
      captcha: "",
    });
    setCaptchaNumber("");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username or Email address</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter username or email"
                name="userNameOrEmail"
                value={loginData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                required
              />
              <div className="eye-open">
                <FaEye />
              </div>
              <div className="eye-close" onClick={handleTogglePassword}>
                <FaEyeSlash />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Captcha</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Captcha"
                name="captcha"
                value={loginData.captcha}
                onChange={handleInputChange}
                required
              />
              <span> Enter same number above {captchNumber}</span>
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
