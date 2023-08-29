import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAdmin } from '../../context/AdminContext';
import { saveYonetici } from '../../api';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};
let name=[];
export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isim,setIsim]=React.useState("");
  const [email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState();
  const [kurumAdi,setKurumAdi]=React.useState();
  const [personelSayisi,setPersonelSayisi]=React.useState();

const {setGuncel}=useAdmin();

  const handleChange =(event)=>{


  }



const handleSubmit =async ()=>{
    const tempId=parseInt(localStorage.getItem("user-id"));
    const personelCount=parseInt(personelSayisi);
    const request={
        "name":isim,
        "email":email,
        "password":password,
        "kurumAdi":kurumAdi,
        "personelSayisi":personelCount,
        "admin_id":tempId,
        "image":"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    }
    console.log(request);
    await saveYonetici(request);
    setGuncel("yonetici");
    handleClose();
 
}


  return (
    <div >
      <Button onClick={handleOpen} variant='contained'>
       YÖNETİCİ EKLE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        
      >  
        <Box sx={style}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:30}}>
            <Typography variant='body1' color='#333333'
            >YENİ YÖNETİCİ OLUŞTUR</Typography>
            <Button onClick={handleClose} >
                <CloseIcon/>
            </Button>

</div>
        <form>
        <TextField
            label="İsim"
            name='isim'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(e) => setIsim(e.target.value)}
            fullWidth
        />
        


        <TextField
            label="E-mail"
            name='email'
            variant="outlined"
            sx={{marginBottom: 2,marginTop:2}}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
        />

        <TextField
            label="Şifre"
            name='password'
            variant="outlined"
            sx={{marginBottom: 2,marginTop:2}}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
        />
        <TextField
            label="Kurum Adı"
            name='kurumAdı'
            variant="outlined"
            sx={{marginBottom: 2,marginTop:2}}
            onChange={(e) => setKurumAdi(e.target.value)}
            fullWidth
        />
        <TextField
            label="Maksimum Personel Sayısı"
            name='personelSayısı'
            variant="outlined"
            sx={{marginBottom: 2,marginTop:2}}
            onChange={(e) => setPersonelSayisi(e.target.value)}
            fullWidth
        />

        </form>

       
        <Button onClick={handleSubmit} sx={{marginTop:3,marginBottom:2}} variant='contained' fullWidth>
            Kaydet
        </Button>
        </Box>
      </Modal>
    </div>
  );
}
