import React, { useEffect, useState } from 'react'
import { useYonetici } from '../../context/YoneticiContext'

function Personel() {

  const {personel,id}=useYonetici();
  const [kullanicilar,setKullanicilar]=useState([]);
  

  useEffect(()=>{
    setKullanicilar(personel);
  },[personel])

  console.log(kullanicilar)

  return (
    <div>Personel</div>
  )
}

export default Personel