import "./App.css";

import RecipeList from "./bricks/RecipeList";
import 'bootstrap/dist/css/bootstrap.min.css';




let recipes = require('./data/recipes.json');

function App() {
  return (
    <div className="App">
      <RecipeList recipeList={recipes} />
    </div>
  );
}

export default App;