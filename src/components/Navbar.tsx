import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserEntryById from '../lib/getUserEntryById';
import IUser from '../lib/IUser';

export interface INameProps {};

const Name: React.FunctionComponent<INameProps> = props => {
  const auth = getAuth();
  const navigate = useNavigate();

  const user = auth.currentUser;

  let viewMyProfile;

  // useEffect(() => {
  //   const getUserEntry = async () => {
  //     if(!!user) {
  //       let res = await getUserEntryById(user.uid)
  //       viewMyProfile = <button onClick={() => {
  //         navigate('/profile/' + res.username)
  //       }}>{res.username}</button>
  //     } else {
  //       viewMyProfile = undefined
  //       console.log("User is not signed in. ")
  //     }
  //   }
  //   getUserEntry()
  //     .catch(err => console.error(err))
  // }, []);

  let signInOutButton;
  if(auth.currentUser) {
    signInOutButton = <button onClick={() => {
      signOut(auth).catch(err => {
        console.error(err)
      })
      console.log("Signed Out.")
      navigate('/login')
    }}>Log Out</button>
  } else {
    signInOutButton = <button onClick={() => {
      navigate('/login')
    }}>Log In</button>
  }

  return (
    <div className="navbar">
      <h1 className="navlogo" onClick={() => {
        navigate('/')
      }}>What Are You Cooking?</h1>

      <div>
        <button onClick={() => {
          navigate('/createrecipe')
        }}>Create Recipe</button>
        {signInOutButton}
        {viewMyProfile}
      </div>
    </div>
  )
};

export default Name