import React, { useEffect, useState } from 'react'
import { useYonetici } from '../../context/YoneticiContext'
import Table from '../../component/TablePersonel';
import { Button, Tab } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from '../../component/Search';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '../../component/ModalPersonel'



function Personel() {

  const {personel,id}=useYonetici();
  const [kullanicilar,setKullanicilar]=useState([]);
  const [search,setSearch]=useState();
  

  useEffect(()=>{
    setKullanicilar(personel);
  },[personel])

  console.log(kullanicilar)

  return (
    <div>
      <div style={{display:'flex',marginTop:5,justifyContent:'space-between',marginRight:80}}>
      <Modal/>
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

     <Table parametre={search}/>
    </div>
    
  )
}

export default Personel