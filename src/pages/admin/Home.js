import React, { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import Table from '../../component/admin/Table'
import { Search, SearchIconWrapper, StyledInputBase } from '../../component/Search';
import SearchIcon from '@mui/icons-material/Search';
import Modal  from '../../component/admin/Modal';

function Home() {


  const [search,setSearch]=useState("");

  return (
    <div>
      <div style={{display:'flex',marginTop:40,justifyContent:'space-between',marginRight:80,marginLeft:80}}>
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
      <div style={{marginTop:100,marginLeft:60}}>
      <Table parametre={search}/>
      </div>
      
    </div>
  )
}

export default Home