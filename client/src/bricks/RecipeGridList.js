import React from "react";
import Recipe from "./Recipe";
import styles from "../css/recipeList.module.css";
/*
function RecipeList(props) {
  function getRecipeList(recipeList) {
    return <div  className={styles.container}> {recipeList.map((recipe) => {
      return <Recipe key={recipe.id} recipe={recipe} />;
    })} </div>;
  }

  return getRecipeList(props.recipeList);
}*/

function RecipeList(props) {
  return (
    <div class="row">
      {props.recipeList.map((recipe) => {
        return (
          <div
            class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"
            style={{ paddingBottom: "16px" }}
          >
            <Recipe key={recipe.id} recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
}

export default RecipeList;


