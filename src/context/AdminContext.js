import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { findPersonel, getAdmin, getPersoneller, getYoneticilerByAdminId } from '../api';
import { useAuth } from './AuthContext';

const AdminContext =createContext();

const AdminProvider = ({children}) =>{
    const [id,setId]=useState();
    const [yoneticiler,setYoneticiler]=useState([]);
    const [guncel,setGuncel]=useState("");

    const {user,password}=useAuth();

    useEffect(()=>{
        const adminget = async () =>{
            let tempid=null;
            await getAdmin(user,password).then((res)=>{
                localStorage.setItem("user-id",res.id);
                console.log(res);
                setId(res.id);
                tempid=res.id;
               
            });
            await getYoneticilerByAdminId(tempid).then((res)=>{
                setYoneticiler(res);
            })
        }
        adminget();

       

    },[])

    useEffect(()=>{

        const tempId=parseInt(localStorage.getItem("user-id"));
        if(tempId === id) {
            const getYoneticiler = async () =>{
                await getYoneticilerByAdminId(tempId).then((res)=>{
                    setYoneticiler(res);
                })
                
            }
            getYoneticiler();
        }
        
        

    },[id])

    useEffect(()=>{
        if(guncel === "yonetici"){
            const tempId=parseInt(localStorage.getItem("user-id"));
        if(tempId === id) {
            const getYoneticiler = async () =>{
                await getYoneticilerByAdminId(tempId).then((res)=>{
                    setYoneticiler(res);
                })
                
            }
            getYoneticiler();
        }

        }
        setGuncel("false");
        


    },[guncel])



    
    const data={
        yoneticiler,
        setYoneticiler,
        guncel,
        setGuncel


    }

    return (
        <AdminContext.Provider value={data}>
            {children}
        </AdminContext.Provider>
    )

}

export const useAdmin=()=> useContext(AdminContext);

export default AdminProvider;


