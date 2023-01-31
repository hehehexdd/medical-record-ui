import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

const NavbarPage = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const history = useNavigate();

  useEffect(() => {
    window.addEventListener("storage", () => {
      const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
      if (loggedIn) {
        setIsLoggedIn(true);
      }
    });
  });

  const handleLogOut = () => {
    setIsLoggedIn(JSON.parse("false"));
    localStorage.clear();
    history("/");
    window.location.reload();
  };

  const handleProfile = () => {
    history("/profile");
  };

  const handleHome = () => {
    history("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Medical Record</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isLoggedIn && localStorage.getItem("role") === "PATIENT" && (
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/myVisits">My Visits</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {isLoggedIn && localStorage.getItem("role") === "DOCTOR" && (
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/visits">Visits</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!isLoggedIn && (
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn ? (
          <Nav.Item>
            <Nav.Link style={{ color: "white" }}>
              Welcome back, {localStorage.getItem("userName")}{" "}
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link></Nav.Link>
          </Nav.Item>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
