import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from "../App"
import RecipeCardContainer from '../components/RecipeCardContainer';

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

      <p className='text-lg xs:text-xl mt-1.5 xs:mt-3'>Welcome to <span className='font-bold text-slate-700'>What Are You Cooking</span>!</p>
      <p className='text-lg xs:text-xl mt-1'>Check out some recently posted recipes</p>
      <RecipeCardContainer recipes={recipes} />
    </div>
    
  )
};

export default Home