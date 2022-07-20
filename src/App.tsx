import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import { initializeApp } from 'firebase/app'
import { config } from './config/config'
import AuthRoute from './components/AuthRoute';

initializeApp(config.firebaseConfig)

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
