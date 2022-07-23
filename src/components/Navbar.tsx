import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface INameProps {};

const Name: React.FunctionComponent<INameProps> = props => {
  const auth = getAuth();
  const navigate = useNavigate();

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
    <div className="navbar">
      <h1 className="navlogo">What Are You Cooking?</h1>

      <div>
        <button onClick={() => {
          navigate('/createrecipe')
        }}>Create Recipe</button>
        {button}
      </div>
    </div>
  )
};

export default Name