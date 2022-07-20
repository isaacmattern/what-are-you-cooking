import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export interface ILoginProps {};

const Login: React.FunctionComponent<ILoginProps> = props => {

  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async() => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
    .then(response => {
      console.log(response.user.uid);
      navigate('/');
    })
    .catch(error => {
      console.log(error)
      setAuthing(false)
    })
  }

  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => signInWithGoogle()} disabled={authing}>Sign In With Google</button>
    </div>
  );
};

export default Login