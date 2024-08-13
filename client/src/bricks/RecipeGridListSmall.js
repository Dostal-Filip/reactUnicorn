import React from "react";
import Recipe from "./RecipeSmall";
import styles from "../css/recipeList.module.css";

function RecipeList(props) {
  function getRecipeList(recipeList) {
    return <div className={styles.container}> {recipeList.map((recipe) => {
      return <Recipe key={recipe.id} recipe={recipe} />;
    })} </div>;
  }

  return getRecipeList(props.recipeList);
}

export default RecipeList;

