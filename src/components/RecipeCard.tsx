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
    <div className="recipeCard">
      <h3 className="recipeTitle">
        <a onClick={() => {
          navigate(`/recipe/${recipeId}`)
        }}>
        {title}</a></h3>
      <h4 className="author">By&nbsp;
        <a onClick={() => {
          navigate(`/profile/${authorUsername}`)
        }}>
        {authorName}</a></h4>
      <p className="description">{description}</p>
    </div>
  );
};

export default RecipeCard