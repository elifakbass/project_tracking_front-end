import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedYoneticiRoute({children}) {
const {user,role}=useAuth();
console.log(role)
localStorage.setItem("role",role);
  if(!localStorage.getItem("user-email") || !parseInt(localStorage.getItem("role"))===2){
    return <Navigate to="/auth/login" />
  }
  return children;
}

export default ProtectedYoneticiRoute