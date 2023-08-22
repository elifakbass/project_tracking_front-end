import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { useAuth } from './AuthContext';
import { findGorevlerByPersonelId, findPersonel, findProjelerByPersonelId, getGorevlerByProjeId, getPersoneller, getYorumlarByProjeId } from '../api';

const PersonelContext = createContext();

const PersonelProvider = ({ children }) => {
  const [projeler, setProjeler] = useState([]);
  const [kullanici, setKullanici] = useState(null);
  const [id, setId] = useState(localStorage.getItem("user-id") || false);
  const [loading, setLoading] = useState("");
  const [projeDurum,setProjeDurum]=useState("");
  const [projeGorev,setProjeGorev] =useState([]);
  const [gorevler,setGorevler]=useState([]);

  const [yoneticiId,setYoneticiId]=useState(null);
  const [personeller,setPersoneller]=useState([]);
  const [guncel,setGuncel]=useState("");
  const [projeId,setProjeId]=useState();

  const { user, password } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      if(!(localStorage.getItem("user-email") === "false") || parseInt(localStorage.getItem("role"))===1){

         await findPersonel(user, password).then((res)=>{
          setKullanici(res);
          localStorage.setItem('user-id', res.id);
          setId(res.id);
          setYoneticiId(res.sorumlu)
          console.log(res.sorumlu);
         });
        
        }
    };

    fetchData();
  }, []); // Bu useEffect, user ve password değiştiğinde tekrar çalışacak

  useEffect(()=>{
    const fetchProject = async () =>{

      if(id !== 0){

      
      const tempId = parseInt(localStorage.getItem('user-id'));
      console.log(tempId);
      await findProjelerByPersonelId(tempId).then((projelerRes)=>{
        setProjeler(projelerRes);
      });
    }
  }
    fetchProject();

    const fetchGorev = async () =>{

      if(id!==0){
         
      const tempId = parseInt(localStorage.getItem('user-id'));
      console.log(tempId);
      await findGorevlerByPersonelId(tempId).then((projelerRes)=>{
        setGorevler(projelerRes);
      });

      }
    }

    fetchGorev();

  },[id]);


  useEffect(()=>{
    setProjeGorev([]);
    if(projeler.length > 0){
       Promise.all(
        projeler.map(async (proje)=>{
          const res= await getGorevlerByProjeId(proje.id);
          return res;
        })).then((gorevler)=>{
          setProjeGorev(gorevler);
        })
    }   

  },[projeler])

  useEffect(()=>{
    const getPersonel = async () =>{

        const tempId=parseInt(localStorage.getItem("user-id"));
            await getPersoneller(tempId).then((res)=>{
                setPersoneller(res);
  })};
   
  getPersonel();


  },[yoneticiId])

  useEffect(()=>{
    
 console.log(projeId);

  },[projeId])




  const data = {
    kullanici,
    projeler,
    loading,
    setLoading,
    projeDurum,
    setProjeDurum, 
    projeGorev,
    personeller,
    gorevler,
    projeId,
    setProjeId,
    guncel,
    setGuncel
  };

  return (
    <PersonelContext.Provider value={data}>
      {children}
    </PersonelContext.Provider>
  );
};

export const usePersonel = () => useContext(PersonelContext);

export default PersonelProvider;
