import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { getGorevlerByProjeId, getPersoneller, getProjelerByPersonelId, getYonetici } from '../api';
import { useAuth } from './AuthContext';

const YoneticiContext =createContext();

const YoneticiProvider = ({children}) =>{
    const [id,setId]=useState();
    const [name,setName]=useState();
    const [kurum,setKurum]=useState();
    const [personelSayisi,setPersonelSayisi]=useState();
    const [image,setImage]=useState();

    const [personel,setPersonel]=useState([]);
    const [proje,setProje]=useState([]);
    const [gorev,setGorev]=useState([]);
    const [post,setPost]=useState("");

    const [projeDurum,setProjeDurum]=useState("");
    const [updateId,setUpdateId]=useState();

    const {user,password}=useAuth();
    

 useEffect(()=>{
    const yonetici = async (username,password)=>{
        await getYonetici(username,password).then((res)=>{
          localStorage.setItem("user-id",res.id);
          setId(res.id)
        })
        }
        yonetici(user,password);

        
 },[])


    useEffect(()=>{
        const getPersonel = async () =>{
            const tempId=parseInt(localStorage.getItem("user-id"));
                await getPersoneller(tempId).then((res)=>{
                    setPersonel(res);
                }); 
        }
        getPersonel();
        

    },[id]);

    useEffect(()=>{
            setProje([]);
            if (personel.length > 0) {
                Promise.all(personel.map(async (p) => {
                    const res = await getProjelerByPersonelId(p.id);
                    return res;
                })).then((projeler) => {
                    if(projeler !== undefined){
                        const projects=projeler.filter(projeler => projeler.length > 0);
                        setProje(projects);
                    }
                    
                });
            }
      
    },[personel])
    console.log(proje);

    useEffect(()=>{
        if(proje.length>0){
            let i=0;
            Promise.all(proje.map( async (p) =>{
                    if(p !== undefined){
                        const res = await getGorevlerByProjeId(p[i].id);
                        i++;
                        return res;
                    }  
                     
     
            })).then((gorevler) =>{
                
                if(gorevler!==[]){
                    setGorev(gorevler);
                }
                
            })

        }

    },[proje]);

    useEffect(()=>{
        if(post==="proje"){
            setProje([]);
            if (personel.length > 0) {
                Promise.all(personel.map(async (p) => {
                    const res = await getProjelerByPersonelId(p.id);
                    return res;
                })).then((projeler) => {
                    const projects=projeler.filter(projeler => projeler.length > 0)
                    setProje(projects);
                });
            }

        }
        else if(post === "personel"){
            setPersonel([]);
            const getPersonel = async () =>{
                const tempId=parseInt(localStorage.getItem("user-id"));
                    await getPersoneller(tempId).then((res)=>{
                        setPersonel(res);
                    }); 
            }
            getPersonel();

        }
        setPost("false");

    },[post])

console.log(proje);

    const data={

        personel,
        setPersonel,
        setId,
        setImage,
        setKurum,
        setName,
        setPersonelSayisi,
        proje, 
        gorev,
        post,
        setPost,
        projeDurum,
        setProjeDurum,
        updateId,
        setUpdateId
    }

    return (
        <YoneticiContext.Provider value={data}>
            {children}
        </YoneticiContext.Provider>
    )

}

export const useYonetici=()=> useContext(YoneticiContext);

export default YoneticiProvider;



