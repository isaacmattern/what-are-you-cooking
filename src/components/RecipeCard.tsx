import React from 'react';
import IRecipe from '../lib/IRecipe';

export interface IRecipeCardPropTypes {
  title: string;
  description: string;
  author: string;
}

const RecipeCard: React.FunctionComponent<IRecipeCardPropTypes> = ({
  title,
  description,
  author
}) => {
  return (
    <div className="recipeCard">
      <h3 className="recipeTitle">{title}</h3>
      <h4 className="author">{author}</h4>
      <p className="description">{description}</p>
    </div>
  );
};

export default RecipeCard