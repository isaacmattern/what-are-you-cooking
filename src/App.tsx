import React, {lazy, Suspense, useEffect, useState} from 'react';
import { BrowserRouter, Outlet, Route, Router, Routes, useOutletContext } from 'react-router-dom';
import './App.css';
import UserContext from './context/user';

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { config } from './config/config'
import AuthRoute from './components/AuthRoute';
import ReactLoader from './components/ReactLoader';
import getUser from './lib/getUserEntryById';
import { getAuth } from 'firebase/auth';
import IUser from './lib/IUser';
import getUserEntryById from './lib/getUserEntryById';
import Navbar from './components/Navbar';

const app = initializeApp(config.firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app)

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Recipe = lazy(() => import('./pages/Recipe'))
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'))
const NotFound = lazy(() => import('./pages/NotFound'))

// type ContextType = { user: IUser | null };

export const AuthProvider = (setUserEntry:React.Dispatch<React.SetStateAction<IUser | null>>) => {
  useEffect(() => {
    getAuth().onAuthStateChanged(async user => {
      if (user) {
        let res = await getUserEntryById(user.uid)
          setUserEntry(res)
          console.log("User info successfully fetched and set.")
          console.log(res)
      }
      else {
        setUserEntry(null)
        console.log("User is not signed in. ")
      }
    })
  }, [])
}

const App: React.FunctionComponent = () => {

  const [userEntry, setUserEntry] = useState<IUser | null>(null)

  AuthProvider(setUserEntry)

  return (
    <div>
        <BrowserRouter>
          <Navbar userEntry={userEntry} />
          <Suspense fallback={<ReactLoader />}>
            <Routes >
              <Route path={'/login'} element={<Login />} />
              <Route path={'/'} element={<Home />} />
              <Route path={'/profile/:username'} element={<Profile />} />
              <Route path={'/recipe/:recipeId'} element={<Recipe />} />
              <Route path={'/createrecipe'} element={
                <AuthRoute>
                  <CreateRecipe userEntry={userEntry} />
                </AuthRoute>
              }/>
              <Route path='/not-found' element={<NotFound />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </div>

  );
}


export default App;
