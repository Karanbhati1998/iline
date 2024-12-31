import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/getToken';

const ProtectedRoute = () => {
     const isAuthenticated = getToken("ilineLogin", "token");
     if(!isAuthenticated){
        return <Navigate to="/login" replace />;
     }
  return (
     <Outlet/>
  )
}

export default ProtectedRoute