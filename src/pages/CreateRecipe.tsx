import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../App';
import Navbar from '../components/Navbar';
import getUser from '../lib/getUser';
import IRecipe from '../lib/IRecipe';

export interface ICreateRecipeProps {};

const CreateRecipe: React.FunctionComponent<ICreateRecipeProps> = props => {

  const user = getAuth().currentUser;
  const navigate = useNavigate();

  const [userEntry, setUserEntry] = useState({
    emailAddress: "???",
    fullName: "???",
    userId:"???",
    username:"???",
  })

  const [form, setForm] = useState<IRecipe>({
    title: "",
    description: "",
    authorID: "",
    authorUsername: "",
    authorName: "",
    ingredients: [],
    directions: [],
  });

  useEffect(() => {
    getUserEntry()
  }, []);

  const getUserEntry:any = async() => {
    if(!!user) {
      getUser(user.uid)
        .then(res => {
          setUserEntry(res)
          setForm({
            ...form,
            authorID: userEntry.userId,
            authorUsername: userEntry.username,
            authorName: userEntry.fullName,
          })
        })
        .catch(err => console.log(err))
    } else {
      console.error("User is not signed in. ")
    }
  }

  console.log("userEntry below")
  console.log(userEntry)




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

    console.log("here")
    console.log(userEntry.userId)

    const snap = await getDoc(doc(db, "posts", userEntry.userId))

    console.log(snap)

    console.log("here")


    if(snap.exists()) {

      // Add recipe to recipes collection
      let recipeId;
      const recipesCollectionRef = collection(db, "recipes")
      addDoc(recipesCollectionRef, form)
        .then(docRef => recipeId = docRef.id)
        .catch(err => console.error(err))

      // Add ID of new recipe to user's posts array
      let data = snap.data()
      data.posts.push(form)
      await updateDoc(doc(db, "posts", userEntry.userId), { data })
    } else {
      console.log(userEntry.userId)
      console.error("Posts entry not found in database for this user")
    }

  }

  const handleIngredient = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsClone
    })
  }

  const handleDirection = (e: ChangeEvent<HTMLTextAreaElement>, i: number) => {
    const directionsClone = [...form.directions]

    directionsClone[i] = e.target.value

    setForm({
      ...form,
      directions: directionsClone
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