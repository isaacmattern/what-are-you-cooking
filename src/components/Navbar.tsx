import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import IUser from '../lib/IUser';

export interface INavbarProps {
  userEntry: IUser | null,
  setUserEntry: React.Dispatch<React.SetStateAction<IUser | null>>,
};

const Navbar: React.FunctionComponent<INavbarProps> = props => {

  const auth = getAuth();
  const navigate = useNavigate();

  const {userEntry, setUserEntry} = props

  let signInOutButton;
  if(auth.currentUser) {
    signInOutButton = 
      <button className='button strong-button' onClick={() => {
        signOut(auth).catch(err => {
          console.error(err)
        })
        setUserEntry(null)
        console.log("Signed Out.")
        navigate('/login')
      }}>Log Out</button>
  } else {
    signInOutButton = 
      <button className='button log-in-out' onClick={() => {
        navigate('/login')
      }}>Log In</button>
  }

  return (
    <div className="navbar">
      <h1 className="navlogo text-slate-700 text-2xl xs:text-3xl sm:text-4xl font-bold whitespace-nowrap cursor-pointer mb-1 sm:mb-2 text-center hover:opacity-60" onClick={() => {
        navigate('/')
      }}>What Are You Cooking?</h1>

      <div className='m-auto text-center flex flex-wrap justify-center xs:block'>
        <div className='inline'>
          <button className='button' onClick={() => {
            navigate('/search')
          }}>
            Search
          </button>
          <button className='button' onClick={() => {
            navigate('/createrecipe')
          }}>Create Recipe</button>
        </div>

        <div className='inline'>
          <button className='button' onClick={() => {
            if(userEntry) {
              navigate(`/profile/${userEntry.username}`)
            } else {
              navigate('login')
            }
          }}>My Profile</button>

        {signInOutButton}
        </div>

      </div>
    </div>
  )
};

export default Navbar