import { deleteDoc, getDoc, updateDoc, doc, collection } from 'firebase/firestore';
import {db} from "../App"
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import getRecipeById from '../lib/getRecipeById';
import IRecipe from '../lib/IRecipe';
import IUser from '../lib/IUser';

export interface IRecipeProps {
  userEntry: IUser | null;
};

const Recipe: React.FunctionComponent<IRecipeProps> = props => {

  let { recipeId } = useParams()
  let { userEntry } = props

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
        return <li key={id}>{direction}</li>;
      })}
    </ol>
  )

  let deleteButton =
    (recipe.authorUsername == userEntry?.username)
    ? <button className='mt-4 button delete-button'
        onClick={async () => {
          if (window.confirm('Are you sure that you would like to delete your recipe? Deleting the recipe will remove it forever. To confirm your deletion, click OK.')) {
            console.log('User decided to delete item');
            // This is inefficient and can surely be improved.

            // Remove recipe from recipes collection
            const recipesCollectionRef = collection(db, "recipes")
            await deleteDoc(doc(recipesCollectionRef, recipeId))
            if(!!userEntry) {
              // Remove recipe reference from users' posts array
              const userDoc = await getDoc(doc(db, "users", userEntry.userId))
              let data = userDoc.data()
              let posts:string[] = []
              // data is surely defined, appeasing typescript
              if(data !== undefined) {
                posts = data.posts
              }
              posts.push(recipe.recipeId)
              // remove recipe from array
              posts = posts.filter(function(e) { return e !== recipeId })
              await updateDoc(doc(db, "users", userEntry.userId), {posts: posts}) 
            }
            console.log("Recipe successfully deleted")
            navigate('/')
          } else {
            console.log('User decided not to delete item');
          }
        }}>
        Delete Recipe
      </button>
    : <div></div>
  
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

        {deleteButton}


      </div>
      
    </div>


  );
};

export default Recipe