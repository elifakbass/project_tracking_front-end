import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedPersonelRoute({children}) {
const {user,role,setRole}=useAuth();
console.log(role)
localStorage.setItem("role",role);

  if(!localStorage.getItem("user-email") || !parseInt(localStorage.getItem("role"))===1){
    setRole(false);
    return <Navigate to="/auth/login" />
  }
  return children;
}

export default ProtectedPersonelRoute