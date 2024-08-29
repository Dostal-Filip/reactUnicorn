import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "@mdi/react";
import { mdiPlus, mdiLoading } from "@mdi/js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import RecipeForm from "./bricks/RecipeForm";

function App() {
  let navigate = useNavigate();
  const [addGradeShow, setAddGradeShow] = useState(false);
  
  const handleAddGradeShow = () => setAddGradeShow(true);

  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000//ingredient/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientLoadCall({ state: "error", error: responseJson });
        } else {
          setIngredientLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setIngredientLoadCall({ state: "error", error });
      });
  }, []);

  function getChild() {
    switch (ingredientLoadCall.state) {
      case "pending":
        return (
          <div className={"loading"}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
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
          ingridientList={ingredientLoadCall.data}
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
      case "error":
        return (
          <div className={"err"}>
            <div>Nepodařilo se načíst data o receptech.</div>
            <br />
            <pre>{JSON.stringify(ingredientLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="Appka">{getChild()}</div>;
}

export default App;