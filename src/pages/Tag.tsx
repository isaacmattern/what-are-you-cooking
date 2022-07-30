import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeCardContainer from '../components/RecipeCardContainer';
import getRecipesByTag from '../lib/getRecipesByTag';

export interface ITagProps {};

const Tag: React.FunctionComponent<ITagProps> = props => {
  let { tag } = useParams()
  const navigate = useNavigate();
  const [recipes, setRecipes]:any[] = useState([])

  useEffect(() => {
    const checkUserExistsAndSetReciptes = async () => {
      if(tag !== undefined) {
        const recipesRes = await getRecipesByTag(tag)
        if(recipesRes.length === 0 || !!recipesRes) {
          setRecipes(recipesRes)
        } else {
          navigate('/not-found');
        }
      } else {
        navigate('/not-found')
      }
    }
    checkUserExistsAndSetReciptes();
  }, [tag, navigate]);

  return (
    <div>
      <div className='tag-page'>
        <h1 className='text-lg xs:text-xl mt-3'>Recipes with the tag<span className='recipe-page-tag sm:text-base ml-2'>{tag}</span></h1>
        <RecipeCardContainer recipes={recipes} />
      </div>
    </div>
  )
};

export default Tag