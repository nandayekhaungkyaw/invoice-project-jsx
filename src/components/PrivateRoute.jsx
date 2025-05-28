// components/PrivateRoute.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';


const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

 useEffect(() => {
  axios.get(`${import.meta.env.VITE_BASE_URL}/user-profile/profile`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })
    .then((response) => {
      setIsAuthenticated(true);
      setIsLoading(false);

      // ✅ Only reset token if you received a new one from the server
      if (response.data.token) {
        Cookies.set('token', response.data.token);
      }
    })
    .catch(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
      Cookies.remove('token');
    });
}, []);


  if (isLoading) return <div>Loading...</div>; // Or skeleton

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
