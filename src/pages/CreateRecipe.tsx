import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../App';
import Navbar from '../components/Navbar';
import getUserEntryById from '../lib/getUserEntryById';
import getUser from '../lib/getUserEntryById';
import IRecipe from '../lib/IRecipe';
import IUser from '../lib/IUser';

export interface ICreateRecipeProps {};

const CreateRecipe: React.FunctionComponent<ICreateRecipeProps> = props => {

  const user = getAuth().currentUser;
  const navigate = useNavigate();

  const [userEntry, setUserEntry] = useState<IUser>({
    emailAddress: "???",
    fullName: "???",
    userId:"???",
    username:"???",
    posts: [""],
  })

  const [form, setForm] = useState<IRecipe>({
    title: "",
    description: "",
    authorID: "",
    authorUsername: "",
    authorName: "",
    tags: [],
    ingredients: [],
    directions: [],
    recipeId: "",
  });

  useEffect(() => {

    const getUserEntry = async () => {
      if(!!user) {
        let res = await getUserEntryById(user.uid)
        setUserEntry(res)
        setForm({
          ...form,
          authorID: res.userId,
          authorUsername: res.username,
          authorName: res.fullName,
        })
        console.log("User info successfully fetched and set.")
      } else {
        console.error("User is not signed in. ")
      }
    }

    getUserEntry()
      .catch(err => console.error(err))

  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !form.title ||
      !form.description ||
      !form.ingredients ||
      !form.directions
    ) {
      alert("Please fill out all fields")
      return
    }

    const userDoc = await getDoc(doc(db, "users", userEntry.userId))

    if(!!userDoc) {

      // Add recipe to recipes collection
      let recipeId:string = "X";
      const recipesCollectionRef = collection(db, "recipes")
      await addDoc(recipesCollectionRef, form)
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
      <Navbar />
      
      <div className="popup-inner">
          <h2>Add a new recipe</h2>

          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Tags</label>
              {
                form.tags.map((tag, i) => (
                  <input 
                    type="text"
                    key={i}
                    value={tag} 
                    onChange={e => handleTag(e, i)} />
                ))
              }
              <button type="button" onClick={handleTagCount}>Add tag</button>
            </div>

            <div className="form-group">
              <label>Ingredients</label>
              {
                form.ingredients.map((ingredient, i) => (
                  <input 
                    type="text"
                    key={i}
                    value={ingredient} 
                    onChange={e => handleIngredient(e, i)} />
                ))
              }
              <button type="button" onClick={handleIngredientCount}>Add ingredient</button>
            </div>

            <div className="form-group">
              <label>Directions</label>
              {
                form.directions.map((direction, i) => (
                  <textarea 
                    key={i}
                    value={direction} 
                    onChange={e => handleDirection(e, i)} />
                ))
              }
              <button type="button" onClick={handleDirectionCount}>Add direction</button>
            </div>

            <div className="buttons">
              <button type="submit">Submit</button>
            </div>

          </form>
        </div>
      </div>
  );
};

export default CreateRecipe