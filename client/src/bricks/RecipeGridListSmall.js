import React from "react";
import RecipeSmall from "./RecipeSmall";
import styles from "../css/recipeList.module.css";

function RecipeList(props) {
  function getRecipeList(recipeList, ingredientList) {
    return <div className={styles.container}> {recipeList.map((recipe) => {
      return <RecipeSmall key={recipe.id} recipe={recipe} ingredientList={ingredientList}/>;
    })} </div>;
  }

  return getRecipeList(props.recipeList, props.ingredientList);
}

export default RecipeList;

