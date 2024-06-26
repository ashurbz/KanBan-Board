import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuth, userDetails } from "../redux/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { auth, googleProvider } from "../utilities/fireBaseConfig";
import { signInWithPopup } from "firebase/auth";
import "./signIn.css";
import axios from "axios";

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
  function generateRandomNumber() {
    return (Math.floor(Math.random() * 9000) + 1000).toString();
  }
  useEffect(() => {
    setCaptchaNumber(generateRandomNumber());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:9000/users`).then((result) => {
      let userFound = false;
      let loginSuccessful = false;

      result.data.map((user) => {
        if (
          user.email === loginData.userNameOrEmail ||
          user.userName === loginData.userNameOrEmail
        ) {
          userFound = true;
          if (user.password === loginData.password) {
            if (loginData.captcha !== captchNumber) {
              window.alert("Captcha is not verified");
              return;
            }
            dispatch(userDetails(user.fullName));
            dispatch(isAuth(true));
            navigate("/dashboard");
            window.alert("Login successful");
            loginSuccessful = true;
          }
        }
      });

      if (!userFound || !loginSuccessful) {
        window.alert("Password or email incorrect");
      }

      setLoginData({
        userNameOrEmail: "",
        password: "",
        captcha: "",
      });
      setCaptchaNumber(generateRandomNumber());
    });
  };

  const handleSocialSignIn = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(userDetails(user.displayName));
        dispatch(isAuth(true));
        navigate("/dashboard");
        window.alert("Login successful");
      })
      .catch((error) => {
        console.error("Error signing in with social account", error);
        window.alert("Failed to login with social account");
      });
  };

  return (
    <>
      <NavBar />
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
                  value={loginData.userNameOrEmail}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                {togglePassword ? (
                  <>
                    <Form.Control
                      type="input"
                      placeholder="Password"
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
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
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="eye-open" onClick={handleTogglePassword}>
                      <FaEyeSlash />
                    </div>
                  </>
                )}
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

              <div className="social-signin" style={{ marginTop: "10px" }}>
                <Button
                  variant="danger"
                  onClick={() => handleSocialSignIn(googleProvider)}
                >
                  Sign in with Google
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
