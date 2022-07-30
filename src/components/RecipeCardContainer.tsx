import React from 'react';
import RecipeCard from './RecipeCard';
import IRecipe from '../lib/IRecipe'

export interface IRecipeCardContainerProps {
  recipes: IRecipe[];
};

const RecipeCardContainer: React.FunctionComponent<IRecipeCardContainerProps> = ({recipes}) => {

  
  return(
    <div className='recipes flex flex-wrap justify-start items-center gap-8 mt-4'>
        {recipes.map((recipe:IRecipe, i:any) => (
          <div className='w-72' key={i}>
            <RecipeCard 
            title={recipe.title}
            recipeId={recipe.recipeId}
            description={recipe.description}
            authorName={recipe.authorName} 
            authorUsername={recipe.authorUsername}
            key={i} />
          </div>
        ))}
    </div>
  )

  
};

export default RecipeCardContainer