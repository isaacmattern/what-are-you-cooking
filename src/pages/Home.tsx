import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from "../App"
import RecipeCardContainer from '../components/RecipeCardContainer';
import Navbar from '../components/Navbar';

export interface IHomeProps {};

const Home: React.FunctionComponent<IHomeProps> = props => {
  
  const navigate = useNavigate();

  const [recipes, setRecipes]:any[] = useState([])

  const recipesCollectionRef = collection(db, "recipes")

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      console.log(snapshot)
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  return (
    <div>
      {/* <Navbar /> */}

      <p>Welcome to What Are You Cooking</p>
      <RecipeCardContainer recipes={recipes} />
    </div>
    
  )
};

export default Home