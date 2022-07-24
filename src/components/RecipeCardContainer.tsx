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
          description={recipe.title}
          author={recipe.authorName} 
          key={i}/>
      ))}
    </div>
  )

  
};

export default RecipeCardContainer