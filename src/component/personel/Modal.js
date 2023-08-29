import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputAdornment, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getProjectById, getYorumlarByProjeId, saveProje, saveYorum } from '../../api';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Table from '../personel/Table';
import { usePersonel } from '../../context/PersonelContext';
import Yorum from '../personel/Yorum';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: '#f2f2f2',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  borderRadius:5
};
export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isim,setIsim]=React.useState("");
  const [sonTarih,setSonTarih]=React.useState("");
  const [icerik,setIcerik]=React.useState("");
  const [sorumlu,setSorumlu]=React.useState();
  const [yorum,setYorum]=React.useState("");

const {personeller,setGuncel} =usePersonel();
const {gorevler,projeId,proje,images,yorumlar}=props;

  const handleChange =(event)=>{
    setSorumlu(event.target.value);

  }

const handleSubmit =async ()=>{
  let personel_id=parseInt(localStorage.getItem("user-id"));
  const request={
    "personelId":personel_id,
    "projeId":projeId,
    "icerik":yorum
  }
  await saveYorum(request);
  setYorum("");
setGuncel(true);
  
}

if(proje===undefined){
  return(
    <div>
      Loading
    </div>
  )
}


  return (
    <div >
      <Button sx={{backgroundColor:'#a366ff', color:'#fff',marginLeft:10,marginTop:2}} onClick={handleOpen} variant='contained'>
       DETAYLARI GÖR
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        
      >  
       
        <Box sx={style}>
              <button onClick={handleClose} style={{marginLeft:600,marginTop:'-15px',marginBottom:10 ,display:"inline-block",border:'none',cursor:'pointer',backgroundColor:'#f2f2f2'} }>
                <CloseIcon htmlColor='#e60000'/>
            </button>
            <div style={{display:'flex',backgroundColor:'#fff',height:'60px',marginBottom:15,borderRadius:9}}>
            <Typography sx={{marginBottom:4,marginRight:40,fontSize:20,color:'#484848',marginTop:2,marginLeft:2}}>
              {proje.name}
            </Typography>
            <span style=
           {proje.durum==="20" ? {width:130,height:30, backgroundColor:'#8569D4',color:'#fff',textAlign:'center',marginTop:'15px'} : proje.durum==="10"  ?  
           {width:130,height:30, backgroundColor:'#ff9933',color:'#fff',textAlign:'center',marginTop:'15px'} :
            proje.durum==="30" ? {width:130,height:30, backgroundColor:'#59A86F',color:'#fff',textAlign:'center',marginTop:'15px'} : {width:250,height:50} }  >
             
             {
              proje.durum==="30" ? "Tamamlandı" : proje.durum==="10" ? "Başlamadı" :" Devam Etmekte"
             }
           </span>

          </div>
          <div style={{display:'block',backgroundColor:'#fff',height:'80px',marginBottom:15,borderRadius:9}}>
        
            <span style={{color:'#bfbfbf',fontSize:14,marginLeft:10,marginTop:5,display:'relative'}}>Açıklama</span>
            <div style={{display:'flex'}}>
              <Typography variant='body1' sx={{width:'70%',marginLeft:1,marginTop:1,color:'#262626'}}>{proje.icerik}</Typography>

              <span style={{color:'#262626'}}>
                <CalendarMonthIcon sx={{marginRight:1,color:'#262626',marginTop:1}}/>
                {proje.sonTarih}
              </span>

            </div>
            
          </div>
          <div style={{display:'inline-block',backgroundColor:'#fff',padding:5}}> 
             Aktif Görevler
          </div>
          <Table gorevler={gorevler} images={images}/>

          <div style={{display:'inline-block',backgroundColor:'#fff',padding:5}}> 
             Yorumlar
          </div>
          <Yorum projeId={projeId} yorumlar={yorumlar} />

          <Box
            sx={{
              width: 640,
              maxWidth: '100%',
              marginTop:5,
              display:'flex'
            }}
          >
            <TextField fullWidth label="Bir Yorum Ekleyin" id="fullWidth"
              color='secondary'
              onChange={(e) => setYorum(e.target.value)}
              value={yorum}
            />
            <button onClick={handleSubmit} style={{marginLeft:5,color:'#400080',width:'120px',backgroundColor:'#bf80ff',border:'1px solid #400080',cursor:'pointer',borderRadius:5}}>Gönder</button>
          </Box>
        
        </Box>
      </Modal>
    </div>
  );
}
