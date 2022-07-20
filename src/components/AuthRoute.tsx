import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export interface IAuthRouteProps {
  children: any;
};

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {

  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoading(false);
      } else {
        console.log("Unathorized.")
        navigate('/login')
      }
    });

    return () => AuthCheck()
  }, []);

  

  if(loading) return <p>Loading</p>
  
  return <div>{children}</div>;
};

export default AuthRoute