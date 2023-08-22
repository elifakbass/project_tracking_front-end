import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import {Formik, replace, useFormik} from 'formik'
import * as yup from 'yup';
import Star1 from '../../images/icons8-star-64.png'
import Star2 from '../../images/icons8-star-100.png'
import Notebook from '../../images/icons8-notebook-64.png'
import { apiLogin, getYonetici } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useYonetici } from '../../context/YoneticiContext';

function Login() {

    const validationSchema = yup.object({
        email: yup
          .string('Email giriniz')
          .email('Geçerli e-mail giriniz.')
          .required('Email gerekli'),
        password: yup
          .string('Şifrenizi giriniz')
          .min(6, 'Şifre en az 6 karakter içermeli')
          .required('Şifre gerekli'),
      });
      
      const {setUser,setRole,setPassword}=useAuth();

      const navigate=useNavigate();
      const formik = useFormik( {
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          await apiLogin(values.email,values.password).then((res)=>{     
            if(res.message==="Login Success"){
              setRole(res.role);
              setUser(values.email);
              setPassword(values.password);
              
              localStorage.setItem("password",values.password);
              localStorage.setItem("user-email",values.email);
              localStorage.setItem("role",res.role);

              switch(res.role){
                case 1: 
                  localStorage.setItem("role",1);
                  navigate("/",{replace:true}); 
                  window.location.reload();   
                  break;
                case 2:
                  localStorage.setItem("role",2);
                  navigate("/yonetici",{replace:true});
                  window.location.reload();
                  break;
                case 3:
                  localStorage.setItem("role",3);
                  navigate("/admin",{replace:true});
                  window.location.reload();
                  break; 
                default:
                  navigate("/",{replace:true});
              }

            }
          })
        },
      });
     

  return (
    <Box sx={{width:600,height:500,backgroundColor:'#f0e6ff',borderRadius:5,marginLeft:80,marginTop:20}}>
        <Box display={'flex'}>
           <div style={{marginTop:'50px',marginLeft: '50px',fontSize:'32px',letterSpacing:1,color:'#290066',fontFamily:'monospace'}} >Giriş Yap</div>
        </Box>
        <img src={Star1}  style={{position:'absolute', right:80,top:85,width:30}}/>
        <Box display={'flex'}>
        <img src={Star2}  style={{position:'absolute', left:120,bottom:400,width:30}}/>
        <img src={Notebook}  style={{position:'absolute', right:600,bottom:250,width:30}}/>
        
        <form onSubmit={formik.handleSubmit}
        style={{position:'relative',width:500,height:600,padding:'40px'}}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          style={{marginTop:'20px',marginBottom:'25px'}}
          color="secondary"
        />

        <TextField
        fullWidth
        id="password"
        name="password"
        label="Şifre"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        style={{marginBottom:'35px'}}
        color="secondary"
      />
      <Button variant="contained" width={100} type="submit" sx={{width:190,color:'#fff',backgroundColor:'#4700b3',marginLeft:17,marginTop:2}}>
        Giriş Yap
      </Button>
         
       </form>
     
     </Box>
        
    </Box>
  )
}

export default Login