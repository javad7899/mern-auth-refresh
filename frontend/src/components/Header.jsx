import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";
import useAuthStore from "../store/useAuthStore";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { user, isAuthenticated } = useAuthStore();
  const handleLogout = useLogout();

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      style={{
        borderBottom: "1px solid #ccc",
        padding: "0.5rem 1rem",
      }}
    >
      <Container>
        <Navbar.Brand href="/">My App</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/dashboard" className="text-white">
              Dashboard
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={`Welcome, ${user?.username}`}
                id="navbar-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
