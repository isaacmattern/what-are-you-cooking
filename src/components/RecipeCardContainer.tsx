import React from 'react';
import RecipeCard from './RecipeCard';
import IRecipe from '../lib/IRecipe'

export interface IRecipeCardContainerProps {
  recipes: IRecipe[];
};

const RecipeCardContainer: React.FunctionComponent<IRecipeCardContainerProps> = ({recipes}) => {
  return(
    <div className='recipes'>
      {recipes.map((recipe:IRecipe, i:any) => (
        <RecipeCard 
          title={recipe.title}
          recipeId={recipe.recipeId}
          description={recipe.title}
          authorName={recipe.authorName} 
          authorUsername={recipe.authorUsername}
          key={i}/>
      ))}
    </div>
  )

  
};

export default RecipeCardContainer