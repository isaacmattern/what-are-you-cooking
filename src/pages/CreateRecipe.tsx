
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../App';
import IRecipe from '../lib/IRecipe';
import IUser from '../lib/IUser';

export interface ICreateRecipeProps {
  userEntry: IUser | null;
};

const arrayContainsEmptyString = (array:string[]): boolean => {
  let flag = false
  array.forEach(item => {
    if(!item || item.trim().length === 0) {
      console.log("got here")
      flag = true
    }
  })
  return flag;
}

const formatTags = (tags:string[]): string[] => {
  return tags.map(tag => {
    return tag.toLowerCase().trim().replace(/[^a-z0-9 -]/gi, '');
  })
}

const CreateRecipe: React.FunctionComponent<ICreateRecipeProps> = props => {

  const user = getAuth().currentUser;
  const navigate = useNavigate();

  const { userEntry } = props

  const [form, setForm] = useState<IRecipe>({
    title: "",
    description: "",
    authorID: userEntry ? userEntry.userId : "",
    authorUsername: userEntry ? userEntry.username : "",
    authorName: userEntry ? userEntry.fullName : "",
    tags: [],
    ingredients: [""],
    directions: [""],
    recipeId: "",
  });

  if(!userEntry) {
    console.log("CreateRecipe rendered while user was not logged in")
    return <div></div>
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setForm({
      ...form,
      tags: formatTags(form.tags)
    })

    if (
      form.title.trim().length === 0 ||
      form.description.trim().length === 0 ||
      arrayContainsEmptyString(form.ingredients) ||
      arrayContainsEmptyString(form.directions) ||
      arrayContainsEmptyString(form.tags)
    ) {
      alert("Please fill out all fields and make sure no field is left blank.")
      return
    }

    const userDoc = await getDoc(doc(db, "users", userEntry.userId))

    if(!!userDoc) {

      // Add recipe to recipes collection
      let recipeId:string = "X";
      const recipesCollectionRef = collection(db, "recipes")
      await addDoc(recipesCollectionRef, {...form, tags: formatTags(form.tags)})
        .then(async docRef => {
          recipeId = docRef.id
          await updateDoc(docRef, {recipeId: recipeId})
        })
        .catch(err => console.error(err))

      // Add ID of new recipe to user's posts array

      let data = userDoc.data()
      let posts:string[] = []
      if(data !== undefined) {
        posts = data.posts
      }
      posts.push(recipeId)
      await updateDoc(doc(db, "users", userEntry.userId), {posts: posts} )

    } else {
      console.log(userEntry.userId)
      console.error("Posts entry not found in database for this user")
    }

    console.log("userEntry before going Home: ")
    console.log(userEntry)
    navigate('/')

  }

  const handleTag = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const tagCopy = [...form.tags]

    tagCopy[i] = e.target.value

    setForm({
      ...form,
      tags: tagCopy
    })
  }

  const handleIngredient = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const ingredientsCopy = [...form.ingredients]

    ingredientsCopy[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsCopy
    })
  }

  const handleDirection = (e: ChangeEvent<HTMLTextAreaElement>, i: number) => {
    const directionsCopy = [...form.directions]

    directionsCopy[i] = e.target.value

    setForm({
      ...form,
      directions: directionsCopy
    })
  }

  const handleTagCount = () => {
    setForm({
      ...form,
      tags: [...form.tags, ""]
    })
  }

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })
  }

  const handleDirectionCount = () => {
    setForm({
      ...form,
      directions: [...form.directions, ""]
    })
  }

  return (
    <div>
      {/* <Navbar /> */}
      
      <div className="create-recipe-form">
          <h2 className='text-lg'>Add a new recipe using the form below</h2>

          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="create-recipe-form-group">
              <label className='create-recipe-label'>Title</label>
              <input 
                className='create-recipe-input'
                type="text" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} />
            </div>

            <div className="create-recipe-form-group">
              <label className='create-recipe-label'>Description</label>
              <textarea 
                className='create-recipe-textarea'
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} />
            </div>

            <div className="create-recipe-form-group">
              <label className='create-recipe-label'>Tags</label>
              {
                form.tags.map((tag, i) => (
                  <input 
                    className='create-recipe-input'
                    type="text"
                    key={i}
                    value={tag} 
                    onChange={e => handleTag(e, i)} />
                ))
              }
              <button className='button' type="button" onClick={handleTagCount}>Add tag</button>
            </div>

            <div className="create-recipe-form-group">
              <label className='create-recipe-label'>Ingredients</label>
              {
                form.ingredients.map((ingredient, i) => (
                  <input
                    className='create-recipe-input'
                    type="text"
                    key={i}
                    value={ingredient} 
                    onChange={e => handleIngredient(e, i)} />
                ))
              }
              <button className='button' type="button" onClick={handleIngredientCount}>Add ingredient</button>
            </div>

            <div className="create-recipe-form-group">
              <label className='create-recipe-label'>Directions</label>
              <div className='flex align-center'>
                {
                form.directions.map((direction, i) => (
                  <textarea
                    
                    className='create-recipe-input' 
                    key={i}
                    value={direction} 
                    onChange={e => handleDirection(e, i)} />
                  ))
                }
                <button className='button' type="button" onClick={handleDirectionCount}>Add direction</button>
              </div>

            </div>

            <div className="buttons">
              <button type="submit" className='button strong-button my-4'>Submit</button>
            </div>

          </form>
        </div>
      </div>
  );
};

export default CreateRecipe

