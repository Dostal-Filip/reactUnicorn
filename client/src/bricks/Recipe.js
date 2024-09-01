import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";
import IngiridientList from "./IngridientList";
import ReciepForm from "./RecipeForm";
import DeleteRecipe from "./DeleteRecipe";
import  UserContext  from '../UserProvider';



function Recipe(props) {
  const isAuthorized = useContext(UserContext);
  return (
    <Card className={styles.main}>
      <Card.Body className={styles.mainb}>
        <div className={styles.icon}>




          <img className={styles.image} src={props.recipe.imgUri} alt="TODO" ></img>
          <div className={styles.title}>

            {props.recipe.name} <IngiridientList ingridients={props.recipe.ingredients} ingridientList={props.ingredientList} />
          </div>
        </div>


        <div className={styles.text}>
          {props.recipe.description}
        </div>

      </Card.Body>

      {isAuthorized &&
        <><ReciepForm
          recipe={props.recipe}
          ingridientList={props.ingredientList} /><DeleteRecipe
            recipe={props.recipe}
          ></DeleteRecipe></>
      }

    </Card>
  );
}

export default Recipe;