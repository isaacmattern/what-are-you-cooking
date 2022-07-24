import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import getUserEntryByUsername from '../lib/getUserEntryByUsername';
import IUser from '../lib/IUser';

// export interface IProfileProps {
//   user: IUser;
// };

const Profile: React.FunctionComponent = () => {

  let { username } = useParams()
  const [userEntry, setUserEntry] = useState<IUser | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExists = async () => {
      console.log(username)
      const res = await getUserEntryByUsername(username || "");
      console.log(res)
      
      if(!!res && res.userId) {
        setUserEntry(res);
      } else {
        navigate('/not-found');
      }
    }
    checkUserExists();
  }, [username]);

  return (
    <div>
      <Navbar />
      <div className='profile'>
        <h1>Recipes from {username}</h1>
        {/* Get Recipes from a specific user! */}
        {/* <RecipeCardContainer recipes={recipes}> */}
      </div>
    </div>

  )
};

export default Profile