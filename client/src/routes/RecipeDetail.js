import { useSearchParams } from 'react-router-dom';



function RecipeDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
searchParams.get("__firebase_request_key")
    return <div className="RecipeDetail">detail</div>;
}
  export default RecipeDetail;