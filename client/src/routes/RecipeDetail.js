import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import IngiridientList from '../bricks/IngridientList';
import styles from "../css/recipe.module.css";
import { useSearchParams } from 'react-router-dom';


function RecipeDetail() {
  const [searchParams, setSearchParams] = useSearchParams();

  document.body.style = 'background: darkslategray;';
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
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

    }).catch((err) => {
      setRecipeLoadCall({ state: "error", error: err });
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000//ingredient/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientLoadCall({ state: "error", error: responseJson });
        } else {
          setIngredientLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setIngredientLoadCall({ state: "error", error });
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
        let recipeID = searchParams.get("id");
        let recipe = recipeLoadCall.data.find(item => item.id === recipeID);
        //<RecipeList recipeList={recipeLoadCall.data} ingredientList={ingredientLoadCall.data} />
        return (
          <div className="Home">

            <div className={styles.icon}>




              <img className={styles.image} src={recipe.imgUri} alt="Obrázek receptu" ></img>
              <div className={styles.title}>

                {recipe.name} <IngiridientList ingridients={recipe.ingredients} ingridientList={ingredientLoadCall.data} />
              </div>
            </div>
            <div>{
              recipe.ingredients.map((ingredient) => {
                let ingredientName = ingredientLoadCall.data.find(item => item.id === ingredient.id);
                return (
                  <div key={ingredient.id}>
                    {ingredientName.name.concat(String.fromCharCode(9), ingredient.amount, " ", ingredient.unit)}
                  </div>
                );
              })}

            </div>

            <div className={styles.text}>
              {recipe.description}
            </div>


          </div>
        );
      case "error":
        return (
          <div className={"err"}>
            <div>Nepodařilo se načíst data o receptu.</div>
            <br />
            <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="Home">{getChild()}</div>;
}
export default RecipeDetail;