import React, {lazy, Suspense, useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { config } from './config/config'
import AuthRoute from './components/AuthRoute';
import ReactLoader from './components/ReactLoader';
import { getAuth } from 'firebase/auth';
import IUser from './lib/IUser';
import getUserEntryById from './lib/getUserEntryById';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Tag from './pages/Tag';
import Search from './pages/Search';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app)

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Recipe = lazy(() => import('./pages/Recipe'))
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'))
const NotFound = lazy(() => import('./pages/NotFound'))

// type ContextType = { user: IUser | null };

export const AuthProvider = (setUserEntry:React.Dispatch<React.SetStateAction<IUser | null>>, setIsLoading:React.Dispatch<React.SetStateAction<Boolean>>) => {
  useEffect(() => {
    getAuth().onAuthStateChanged(async user => {
      if (user) {
        let res = await getUserEntryById(user.uid)
          setUserEntry(res)
          console.log("User info successfully fetched and set.")
          console.log(res)
          setIsLoading(false)
      }
      else {
        setUserEntry(null)
        console.log("User is not signed in. ")
        setIsLoading(false)
      }
    })
  }, [setIsLoading, setUserEntry])
}

const App: React.FunctionComponent = () => {

  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [userEntry, setUserEntry] = useState<IUser | null>(null)

  AuthProvider(setUserEntry, setIsLoading)

  if(isLoading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        <div className='main-content font-sans text-sm xs:text-base text-slate-800 w-full max-w-screen-lg m-auto py-4 px-4'>
          <BrowserRouter>      
            <Suspense fallback={<ReactLoader />}>
              <Navbar userEntry={userEntry} setUserEntry={setUserEntry} />
              <Routes >
                <Route path={'/login'} element={<Login setUserEntry={setUserEntry}  />} />
                <Route path={'/'} element={<Home />} />
                <Route path={'/profile/:username'} element={<Profile />} />
                <Route path={'/recipe/:recipeId'} element={<Recipe userEntry={userEntry} />} />
                <Route path={'/tags/:tag'} element={<Tag />} />
                <Route path={'/search/:input'} element={<Search />} />
                <Route path={'/search/'} element={<Search />} />
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
         <Footer />
      </div>           

    );
  }
}


export default App;
