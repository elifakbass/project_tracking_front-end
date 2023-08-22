import React, { useEffect, useState } from 'react'
import ProjeCard from '../../component/personel/ProjectCard';
import PersonelProvider, { usePersonel } from '../../context/PersonelContext';
import GorevCard from '../../component/personel/GorevCard';


function Home() {

  const {projeler,kullanici,gorevler}=usePersonel();
  const [projects,setProjects]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (projeler.length === 0 || kullanici === null || gorevler.length === 0) {
      setLoading(false); // Data henüz yüklenmediğinde loading durumunu false olarak işaretle
      setError('Data not available'); // Hata durumunu güncelle
    } else {
      setLoading(false); // Data yüklendiğinde loading durumunu false olarak işaretle
      setError(null); // Hata durumunu temizle
    }
  }, [projeler, kullanici, gorevler]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{display:'flex',backgroundColor:'#f2f2f2',height:'100vh'}}>
      
      <div style={{display:'flex',marginTop:60,marginLeft:100}}>
      {projeler.map((proje,index) => (
          <ProjeCard key={index} proje={proje} index={index}/> // ProjeCard bileşenini döndürdük
        ))}
      
      </div>

      <div style={{display:'flex',marginTop:60,marginLeft:40}}>
      {gorevler.map((gorev,index) => (
          <GorevCard key={index} gorev={gorev} index={index}/> // ProjeCard bileşenini döndürdük
        ))}
      
      </div>
     
    </div>
    
  )
  }


export default Home