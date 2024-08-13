import React, { useMemo, useState } from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import RecipeGridListSmall from "./RecipeGridListSmall";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify, mdiMagnifyPlusOutline, mdiMagnifyMinusOutline } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";
  const [viewSize, setSizeType] = useState("big");
  const isSize = viewSize === "big";
  const [searchBy, setSearchBy] = useState("");

  const filteredRecipeList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) ||
        item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    if (currentState === "grid") return "table";
                    else return "grid";
                  })
                }
              >
                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                {isGrid ? "Tabulka" : "Grid"}
              </Button>
              
              <Button
                variant="outline-primary"
                onClick={() =>
                  setSizeType((currentState) => {
                    if (currentState === "big") return "small";
                    else return "big";
                  })
                }
                disabled={!isGrid}
              >
                <Icon size={1} path={isSize ? mdiMagnifyMinusOutline : mdiMagnifyPlusOutline} />{" "}
                {isSize ? "Small" : "Big"}
              </Button>


            </Form>
          </div>
        </div>
      </Navbar>
      {isGrid ? (
        isSize ? ( <RecipeGridList recipeList={filteredRecipeList} /> ): (<RecipeGridListSmall recipeList={filteredRecipeList} /> )
      ) : (
        <RecipeTableList recipeList={filteredRecipeList} />
      )}
    </div>
  );
}



export default RecipeList;