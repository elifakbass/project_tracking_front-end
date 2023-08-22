import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


function ProtectedAdminRoute({children}) {
    const {user,role}=useAuth();
    console.log(role)
      if(!localStorage.getItem("user-email") || !parseInt(localStorage.getItem("role"))==3){
        return <Navigate to="/auth/login" />
      }
      return children;

  
}
export default ProtectedAdminRoute