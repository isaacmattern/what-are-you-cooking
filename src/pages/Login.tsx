import React, { useEffect, useState } from 'react';
import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from '../App'
import IUser from '../lib/IUser';
import { getAnalytics, setUserProperties } from "firebase/analytics";

import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  updateDoc
} from "firebase/firestore"
import getUniqueUsername from '../lib/getUniqueUsername';

export interface ILoginProps {
  setUserEntry: React.Dispatch<React.SetStateAction<IUser | null>>
};

const Login: React.FunctionComponent<ILoginProps> = props => {

  const { setUserEntry } = props

  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async() => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
    .then(response => {
      console.log(response.user.uid);
      navigate('/');

      const details = getAdditionalUserInfo(response)
      if(!!details && details.isNewUser) {
        console.log("New User")
        // New user
        if(response.user.displayName !== null && response.user.displayName !== null && response.user.email !== null) {
          var fullName = response.user.displayName
          var emailAddress = response.user.email

          // Create New User and Username entry
          getUniqueUsername(response.user.displayName)
            .then(username => {

              setUserEntry({
                userId: response.user.uid,
                username: username,
                fullName: fullName,
                emailAddress: emailAddress,
                posts: []
              })

              setDoc(doc(db, "users", response.user.uid), {
                userId: response.user.uid,
                username: username,
                fullName: fullName,
                emailAddress: emailAddress,
                posts: []
              })
                .then(() => console.log("New user successfully added."))
                .catch(err => console.error(err))

            })
            .catch(err => console.error(err))
          
          // Create new Posts entry whose Doc ID is the new user's ID


          // setDoc(doc(db, "posts", response.user.uid), { posts: [] })
          //   .then(() => console.log("New posts item successfully added for new user."))
          //   .catch(err => console.error(err))
        
        } else {
          console.error("Error creating new account.")
        }
      } else {
        console.log("Returning User")
      }
      navigate('/');
    })
    .catch(error => {
      console.log(error)
      setAuthing(false)
    })
  }

  return (
    <div className='my-4 xs:my-8'>
      <p className='text-md xs:text-lg mb-4 max-w-sm m-auto'>Use an account on What Are You Cooking to post and share your recipes with your friends.</p>
      <div className='flex justify-center'>
        <button className='button' onClick={() => signInWithGoogle()} disabled={authing}>Sign In or Sign Up With Google</button>
      </div>

    </div>
  );
};

export default Login