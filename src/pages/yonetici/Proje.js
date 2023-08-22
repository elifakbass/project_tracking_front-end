import React, { useEffect, useState } from 'react'
import Table from '../../component/ProjeTable'
import { useYonetici } from '../../context/YoneticiContext'
import { Button } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from '../../component/Search';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '../../component/Modal';

const name=[];
function Proje() {
  const {proje,personel}=useYonetici();
  const [projeler, setProjeler]=useState([]);
  const [search,setSearch]=useState();



  useEffect(()=>{
    if(proje.length>0){
      setProjeler(proje);
    }

  },[proje])
  console.log(projeler);


    if(personel!= null){
      let i=0;
      personel.map((p)=>{
        name[i]={
          name:p.name,
          id:p.id
        }
        i++;

      })
    }


console.log(name);
  return (
    <div>
      <div style={{display:'flex',marginTop:2 }}>
      <Modal name={name}/>


      <Search >
            <SearchIconWrapper>
              <SearchIcon sx={{color: "#595959"}} />
            </SearchIconWrapper>
            <StyledInputBase
            sx={{color: "#595959"}}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearch(e.target.value)}    
            />
          </Search>
        </div>

    <Table  parametre={search}/>


    </div>
  )
}

export default Proje