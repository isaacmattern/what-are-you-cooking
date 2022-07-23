import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../App';
import Navbar from '../components/Navbar';
import getUser from '../lib/getUser';
import IRecipe from '../lib/IRecipe';

export interface ICreateRecipeProps {};

const CreateRecipe: React.FunctionComponent<ICreateRecipeProps> = props => {

  const user = getAuth().currentUser;
  const navigate = useNavigate();

  let userEntry = {
    emailAddress: "???",
    fullName: "???",
    userId:"???",
    username:"???",
  }

  if(!!user) {
    getUser(user.uid)
      .then(res => userEntry = res)
      .catch(err => console.log(err))
  } else {
    console.error("User is not signed in. ")
  }


  const [form, setForm] = useState<IRecipe>({
    title: "",
    description: "",
    authorID: userEntry.userId,
    authorUsername: userEntry.username,
    authorName: userEntry.fullName,
    ingredients: [],
    directions: [],
  });

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

    const snap = await getDoc(doc(db, "recipes", userEntry.userId))

    if(snap.exists()) {
      let data = snap.data()
      data.posts.push(form)
      await updateDoc(doc(db, "recipes", userEntry.userId), { data })
    } else {
      console.log(userEntry.userId)
      console.error("Posts entry not found in database for this user")
    }

    // addDoc(recipesCollectionRef, form)
    //   .then(() => {
    //     console.log("Recipe added successfully")
    //     navigate('/')
    //   })
    //   .catch(err => console.log(err))

  }

  const handleIngredient = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.currentTarget.nodeValue || ""

    setForm({
      ...form,
      ingredients: ingredientsClone
    })
  }

  const handleDirection = (e: ChangeEvent<HTMLTextAreaElement>, i: number) => {
    const directionsClone = [...form.directions]

    directionsClone[i] = e.currentTarget.nodeValue || ""

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