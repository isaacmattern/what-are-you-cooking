import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import getUserEntryById from '../lib/getUserEntryById';
import IUser from '../lib/IUser';

export interface INavbarProps {
  userEntry: IUser | null,
};

const Navbar: React.FunctionComponent<INavbarProps> = props => {

  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const {userEntry} = props
  
  // const userEntry  = useUserEntry();

  // console.log("In Navbar")
  // if(userEntry) {
  //   console.log("username is " + userEntry.username)
  // } else {
  //   console.log("user is null")
  // }

  let signInOutButton;
  if(auth.currentUser) {
    signInOutButton = 
      <button onClick={() => {
        signOut(auth).catch(err => {
          console.error(err)
        })
        console.log("Signed Out.")
        navigate('/login')
      }}>Log Out</button>
  } else {
    signInOutButton = 
      <button onClick={() => {
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

        <button onClick={() => {
          if(userEntry) {
            navigate(`/profile/${userEntry.username}`)
          } else {
            navigate('login')
          }
        }}>My Profile</button>

        {signInOutButton}
      </div>
    </div>
  )
};

export default Navbar