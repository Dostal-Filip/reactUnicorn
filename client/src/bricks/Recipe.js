import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";
import IngiridientList from "./IngridientList";

function Recipe(props) {
  return (
    <Card className={styles.main}>
      <Card.Body className={styles.mainb}>
        <div className={styles.icon}>
        
       
 
      
          <img className={styles.image} src={props.recipe.imgUri} ></img>
          <div className={styles.title}>
          
          {props.recipe.name} <IngiridientList ingridients= {props.recipe.ingredients} ingridientList= {props.ingredientList}  />
        </div>
          </div>
        
    
        <div className={styles.text}>
        {props.recipe.description}
        </div>

      </Card.Body>
    </Card>
  );
}

export default Recipe;