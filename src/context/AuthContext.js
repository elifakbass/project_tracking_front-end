import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { findPersonel, getPersoneller } from '../api';

const AuthContext =createContext();

const AuthProvider = ({children}) =>{
    const [user,setUser]=useState(localStorage.getItem("user-email") || false);
    const [password,setPassword]=useState(localStorage.getItem("password") || false );
    const [role,setRole]=useState(localStorage.getItem("role") || false);


    useEffect(()=>{
        localStorage.setItem("role", role);
        localStorage.setItem("user-email", user);
    },[user,role])

    
    const data={
        user,
        setUser,
        role,
        setRole,
        password,
        setPassword,

    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth=()=> useContext(AuthContext);

export default AuthProvider;



