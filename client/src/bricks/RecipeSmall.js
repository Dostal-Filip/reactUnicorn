import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";

function RecipeSmall(props) {
  return (
    <Card className={styles.mainSmall}>
      <Card.Body className={styles.mainbSmall}>
        <div className={styles.iconSmall}>




          <img className={styles.image} src={props.recipe.imgUri} ></img>
          <div className={styles.title}>

            {props.recipe.name}
          </div>
        </div>
        <div className={styles.textSmall}>

          {props.recipe.ingredients.map((ingredient) => {
            let ingredientName = props.ingredientList.find(item => item.id === ingredient.id);
            return (
              <div key={ingredient.id}>
                {ingredientName.name}
              </div>
            );
          })}

        </div>



      </Card.Body>
    </Card>
  );
}

export default RecipeSmall;