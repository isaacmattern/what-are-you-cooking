import React from 'react';
import Navbar from '../components/Navbar';
import IUser from '../lib/IUser';

// export interface IProfileProps {
//   user: IUser;
// };

const Profile: React.FunctionComponent = () => {
  return (
    <div>
      <Navbar />
      <div className='profile'>
        <h1>Recipes from Name</h1>
        {/* Get Recipes from a specific user! */}
        {/* <RecipeCardContainer recipes={recipes}> */}
      </div>
    </div>

  )
};

export default Profile