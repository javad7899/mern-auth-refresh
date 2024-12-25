import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col className="text-center">
          <h1>Welcome to Our App</h1>
          <p>Join us or log in to access your account</p>
          {user ? (
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="m-3"
            >
              Dashboard (protected)
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
                className="m-3"
              >
                Register
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
                className="m-3"
              >
                Login
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
