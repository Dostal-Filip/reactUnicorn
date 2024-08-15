import "./App.css";

import RecipeList from "./bricks/RecipeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";


function App() {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
  state: "pending",
});
  useEffect(() => {
    fetch(`http://localhost:3000//recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  function getChild() {
    switch (recipeLoadCall.state) {
      case "pending":
        return (
          <div className={"loading"}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <div className="App">
            <RecipeList recipeList={recipeLoadCall.data} />
          </div>
        );
      case "error":
        return (
          <div className={"err"}>
            <div>Nepodařilo se načíst data o receptech.</div>
            <br />
            <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getChild()}</div>;
}

export default App;