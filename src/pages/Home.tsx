import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from "../App"
import RecipeCard from '../components/RecipeCard';

export interface IHomeProps {};

const Home: React.FunctionComponent<IHomeProps> = props => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [recipes, setRecipes]:any[] = useState([])
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: []
  });
  const [popupActive, setPopupActive] = useState(false)

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

  let button;
  if(auth.currentUser) {
    button = <button onClick={() => {
      signOut(auth).catch(err => {
        console.error(err)
      })
      console.log("Signed Out.")
      navigate('/login')
    }}>Log Out</button>
  } else {
    button = <button onClick={() => {
      navigate('/login')
    }}>Log In</button>
  }

  return (
    <div>
      <div>
        <h1>What Are You Cooking?</h1>
        {button}
      </div>

      <div className='recipes'>
        {/* {recipes.map((recipe:{title: string, description:string, author: string, ingredients:string[], id: string, viewing:boolean}, i:any) => (
          <div className='recipe' key={recipe.id}>
            <h2>{ recipe.title }</h2>
            <p> {recipe.description} </p>
          </div>
        ))} */}

        {recipes.map((recipe:{title: string, description:string, author: string, id: string}, i:any) => (
          <RecipeCard 
            title={recipe.title}
            description={recipe.title}
            author={recipe.author} />
        ))}
      </div>
    </div>
    
  )
};

export default Home