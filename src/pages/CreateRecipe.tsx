import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../App';
import Navbar from '../components/Navbar';
import IRecipe from '../lib/IRecipe';

export interface ICreateRecipeProps {};

const CreateRecipe: React.FunctionComponent<ICreateRecipeProps> = props => {
  const user = getAuth().currentUser;
  const navigate = useNavigate();


  const recipesCollectionRef = collection(db, "recipes")

  const [form, setForm] = useState<IRecipe>({
    title: "",
    description: "",
    authorID: "",
    authorName: user ? (user.displayName ? user.displayName : "") : "",
    ingredients: [],
    directions: [],
  });

  const handleSubmit = (e: Event) => {
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

    addDoc(recipesCollectionRef, form)
      .then(() => {
        console.log("Recipe added successfully")
        navigate('/')
      })
      .catch(err => console.log(err))

  }

  return (
    <div>
      <Navbar />
      
    </div>
  );
};

export default CreateRecipe