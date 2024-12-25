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

const registerUser = async ({ username, password, role }) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    password,
    role,
  });
  return response.data;
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // After successful registration, redirect to the login page
      console.log(data);
      navigate("/login");
    },
    onError: (error) => {
      setErrorMessage(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message before submission
    mutate({ username, password, role });
  };

  return (
    <Container>
      <Row className="justify-content-center d-flex vh-100 align-items-center">
        <Col md={6}>
          <h1>Register</h1>

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

            <Form.Group controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </Form>

          <Button
            variant="link"
            onClick={() => navigate("/login")}
            className="mt-2"
          >
            Already have an account? Login here.
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
