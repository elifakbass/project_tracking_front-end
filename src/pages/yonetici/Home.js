import { Box, Typography } from '@mui/material'
import React from 'react'
import Takvim from '../../component/Scheduler'

function Home() {
  return (
    <>
    <div style={{display:'flex',marginTop:30}}>

      <Typography variant='body2' sx={{marginLeft:5,marginRight:1}} >Başlamadı</Typography>
      <div style={{width:90,height:20,backgroundColor:'#FF9933'}}> </div>

      
      <Typography variant='body2' sx={{marginLeft:5,marginRight:1}} >Devam Etmekte</Typography>
      <div style={{width:90,height:20,backgroundColor:'#8569D4'}}> </div>

      <Typography variant='body2' sx={{marginLeft:5,marginRight:1}} >Tamamlandı</Typography>
      <div style={{width:90,height:20,backgroundColor:'#3FB460'}}> </div>

    </div>
    <Takvim/>
    
    </>
  )
}

export default Home