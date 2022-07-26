import React from 'react';
import { useNavigate } from 'react-router-dom';
import IRecipe from '../lib/IRecipe';

export interface IRecipeCardPropTypes {
  title: string;
  recipeId: string;
  description: string;
  authorName: string;
  authorUsername: string;
}

const RecipeCard: React.FunctionComponent<IRecipeCardPropTypes> = ({
  title,
  recipeId,
  description,
  authorName,
  authorUsername
}) => {

  const navigate = useNavigate()
  return (
    <div className="recipeCard p-1 rounded-md text-slate-50 bg-slate-700 w-full">
      <h3 className="recipeTitle text-lg xs:text-xl font-bold px-1">
        <a className='link' onClick={() => {
          navigate(`/recipe/${recipeId}`)
        }}>
        {title}</a></h3>
      <h4 className="author w-full bg-slate-50 text-slate-800 px-1">By&nbsp;
        <a className='link' onClick={() => {
          navigate(`/profile/${authorUsername}`)
        }}>
        {authorUsername}</a></h4>
      <p className="description bg-slate-50 text-slate-800 rounded-b-sm px-1">{description}</p>
    </div>
  );
};

export default RecipeCard