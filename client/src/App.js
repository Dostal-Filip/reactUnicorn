import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import RecipeForm from "./bricks/RecipeForm";

function App() {
  let navigate = useNavigate();
  const [addGradeShow, setAddGradeShow] = useState(false);
  
  const handleAddGradeShow = () => setAddGradeShow(true);

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
          Kuchařka
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Kuchařka
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => navigate("/home")}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/detail")}>
                  Detail
                </Nav.Link>
                
          <RecipeForm
        student={null}
        subject={null}
        classroom={null}
        show={null}
        setAddGradeShow={setAddGradeShow}
      />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
        
      </Navbar>
      <div>
      <Outlet />
      </div>
    </div>
    
  );
}

export default App;