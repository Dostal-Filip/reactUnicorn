import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/recipe.module.css";

function Recipe(props) {
  return (
    <Card className={styles.mainSmall}>
      <Card.Body className={styles.mainbSmall}>
        <div className={styles.iconSmall}>
        
       
 
      
          <img className={styles.image} src={props.recipe.imgUri} ></img>
          <div className={styles.title}>

          {props.recipe.name} 
        </div>
          </div>



      </Card.Body>
    </Card>
  );
}

export default Recipe;