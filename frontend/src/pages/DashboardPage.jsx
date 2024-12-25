import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import useLogout from "../hooks/useLogout";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const handleLogout = useLogout();

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
    >
      <Row className="text-center">
        <Col>
          <Card
            className="shadow-lg p-4"
            style={{ maxWidth: "500px", margin: "auto" }}
          >
            <Card.Body>
              <p className="text-muted">Welcome to your dashboard</p>
              <p className="fw-bold">
                Your role: {user?.role || "No role assigned"}
              </p>
              <div className="mt-4">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => navigate("/")}
                  className="m-2"
                >
                  Go to Home
                </Button>
                <Button
                  variant="outline-danger"
                  size="lg"
                  onClick={handleLogout}
                  className="m-2"
                >
                  Log Out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
