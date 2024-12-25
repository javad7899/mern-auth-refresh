import { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import useAuthStore from "../store/useAuthStore";

const loginUser = async ({ username, password }) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { login } = useAuthStore();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful, data:", data);
      const { user, accessToken } = data;
      login(user, accessToken);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <Container>
      <Row className="justify-content-center d-flex vh-100 align-items-center">
        <Col md={6}>
          <h1>Login</h1>

          {isError && errorMessage && (
            <Alert variant="danger">{errorMessage}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>

          <Button
            variant="link"
            onClick={() => navigate("/register")}
            className="mt-2"
          >
            Don&apos;t have an account? Register here.
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
