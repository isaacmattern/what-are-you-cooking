import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../App';
import Navbar from '../components/Navbar';
import RecipeCardContainer from '../components/RecipeCardContainer';
import getUserEntryByUsername from '../lib/getUserEntryByUsername';
import getUserRecipesByUserId from '../lib/getUserRecipesByUserId';
import IUser from '../lib/IUser';

// export interface IProfileProps {
//   user: IUser;
// };

const Profile: React.FunctionComponent = () => {

  let { username } = useParams()
  const [userEntry, setUserEntry] = useState<IUser | undefined>(undefined);
  const navigate = useNavigate();

  const [recipes, setRecipes]:any[] = useState([])

  const recipesCollectionRef = collection(db, "recipes")

  useEffect(() => {
    const checkUserExistsAndSetReciptes = async () => {
      console.log(username)
      const userEntryRes = await getUserEntryByUsername(username || "");
      console.log(userEntryRes)
      
      if(!!userEntryRes && userEntryRes.userId) {
        setUserEntry(userEntryRes);

        const recipesRes = await getUserRecipesByUserId(userEntryRes.userId)
        setRecipes(recipesRes)
      } else {
        navigate('/not-found');
      }
    }
    checkUserExistsAndSetReciptes();
  }, [username]);

  return (
    <div>
      {/* <Navbar /> */}
      <div className='profile'>
        <h1 className='text-lg xs:text-xl mt-3'>Recipes from {userEntry?.fullName} (@{username})</h1>
        <RecipeCardContainer recipes={recipes} />
      </div>
    </div>

  )
};

export default Profile