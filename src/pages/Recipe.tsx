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
    recipeId: "",
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

  let tags = (
    recipe.tags && recipe.tags.map((tag, id) => {
      return (
      <div className='recipe-page-tag' key={id}>
        {tag}
      </div>
      );
    })
  )

  let ingredientsList = (
    <ul className='list-disc ml-8'>
      {recipe.ingredients && recipe.ingredients.map((ingredient, id) => {
        return <li key={id}>{ingredient}</li>;
      })}
    </ul>
  )

  let directionsList = (
    <ol className='list-decimal ml-8'>          
      {recipe.directions && recipe.directions.map((direction, id) => {
        console.log(direction)
        return <li key={id}>{direction}</li>;
      })}
    </ol>
  )
  
  return (

    <div>
      {/* <Navbar /> */}
      <div className='recipe mt-4'>
        <h1 className='font-bold text-lg xs:text-xl'>{recipe.title}</h1>
        {/* <h4>By {recipe.authorName}</h4> */}
        <h4 className='text-xs xs:text-sm'>By&nbsp;
          <a className='link text-slate-600' onClick={() => {
            navigate(`/profile/${recipe.authorUsername}`)
          }}>{recipe.authorName}</a>
        </h4>
        <p>"{recipe.description}"</p>
        <div className='mt-2'>
          {tags}
        </div>
        <h3 className='font-bold mt-2'>Ingredients:</h3>
        {ingredientsList}
        <h3 className='font-bold mt-2'>Directions:</h3>
        {directionsList}


      </div>
      
    </div>


  );
};

export default Recipe