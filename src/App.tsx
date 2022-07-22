import React, {lazy, Suspense, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { config } from './config/config'
import AuthRoute from './components/AuthRoute';
import ReactLoader from './components/ReactLoader';
import getUser from './lib/getUser';
import { getAuth } from 'firebase/auth';
import IUser from './lib/IUser';

const app = initializeApp(config.firebaseConfig)
export const db = getFirestore(app)

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateRecipe = lazy(() => import('./pages/CreateRecipe'))
const NotFound = lazy(() => import('./pages/NotFound'))

// const auth = getAuth();
// let initialUser = null;
// if(!!getAuth && !!getAuth().currentUser) {
//   initialUser = getAuth().currentUser?.uid || null
//   if(getAuth().currentUser?.uid != null) {
//     await getUser(getAuth().currentUser.uid)
//   }
// }

// const [user, setUser] = useState<IUser | null>()

const App: React.FunctionComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<ReactLoader />}>
            <Routes>
              <Route path={'/login'} element={<Login />} />
              <Route path={'/'} element={<Home />} />
              <Route path={'/profile/:username'} element={<Profile />} />
              <Route path='/createrecipe' element={
                <AuthRoute>
                  <CreateRecipe />
                </AuthRoute>
              }/>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
      </BrowserRouter>
    </div>

  );
}

export default App;
