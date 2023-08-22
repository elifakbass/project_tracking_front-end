import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../../images/logo.png';


function AuthLayout() {
  return (
    <>
    <Box sx={{backgroundColor:'#fff',width:'100%',height:'100vh'}}>
        <Box sx={{backgroundColor:'#f0e6ff',width:'100%',height:100}} component='main'>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'normal', padding: '20px' }}>
            <Box component="span" sx={{ display: 'inline-block' }}>
                <img style={{marginLeft:'35px',marginTop:'10px',marginRight:'35px'}}  src={Logo}/>
            </Box>
           
            <Typography component='h6' sx={{display:'inline-block',letterSpacing:2,fontSize:20,color:'#4700b3'}}>
                PROJECT TRACKING
            </Typography>
            </Box>

        </Box>
        <Outlet/>
    </Box>
    
    </>
  )
}

export default AuthLayout