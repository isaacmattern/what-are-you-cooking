import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import getRecipeById from '../lib/getRecipeById';
import IRecipe from '../lib/IRecipe';
import IUser from '../lib/IUser';

export interface IRecipeProps {};

const Recipe: React.FunctionComponent<IRecipeProps> = props => {

  let { recipeId } = useParams()
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<IRecipe>({
    title: "",
    description: "",
    authorID: "",
    authorUsername: "",
    authorName: "",
    tags: [],
    ingredients: [],
    directions: [],
  })

  useEffect(() => {
    const getRecipe = async () => {
      if(!!recipeId) {
        let res = await getRecipeById(recipeId)
        if(!!res) {
          setRecipe(res)
        } else {
          console.log("no response")
          navigate('/not-found');
        }
      } else {
        console.log("no recipeId provided.") 
        navigate('/not-found');
      }
    }
    getRecipe()
      .catch(err => console.error(err))
  }, []);


  let ingredientsList = (
    <ul>
      {recipe.ingredients && recipe.ingredients.map((ingredient, id) => {
        return <li key={id}>{ingredient}</li>;
      })}
    </ul>
  )

  console.log(recipe.directions)

  let directionsList = (
    <ol>          
      {recipe.directions && recipe.directions.map((direction, id) => {
        console.log(direction)
        return <li key={id}>{direction}</li>;
      })}
    </ol>
  )
  
  return (

    <div>
      <Navbar />
      <div className='recipe'>
        <h1>{recipe.title}</h1>
        <h4>By {recipe.authorName}</h4>
        <p>{recipe.description}</p>
        <h3>Ingredients:</h3>
        {ingredientsList}
        <h3>Directions:</h3>
        {directionsList}


      </div>
      
    </div>


  );
};

export default Recipe