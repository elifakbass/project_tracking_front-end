import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MailIcon from '@mui/icons-material/Mail';
import { findUser } from '../api';

const style = {
  position: 'absolute',
  top: '37%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:500,
  bgcolor: '#fff',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [color,setColor]=React.useState("#666");
  const [kullanicilar,setKullanicilar]=React.useState([]);
  const handleOpen = () => 
  {
    setColor("#1a66ff")
    setOpen(true);

  }
  const handleClose = () => {
    setColor("#666")
    setOpen(false);
}

  React.useEffect(()=>{
    const getKullanici= async () =>{
        await findUser().then((res)=>{
            setKullanicilar(res);
        })
    }
    getKullanici();

  },[])
  console.log(kullanicilar);

  return (
    <div>
      <Button onClick={handleOpen}><MailIcon htmlColor={color} /> </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ invisible: true }} // Burada BackdropProps ekleniyor
  
      >
        <Box sx={style}>
            <Box sx={{display:'flex'}}>
                <Box>
                    <div style={{marginBottom:25}}> Gelen Kutusu</div>
                    {kullanicilar.map((kullanici, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 60,
                    height: 50,
                    backgroundColor: '#f2f2f2',
                    marginBottom: 3, // Kutular arasındaki boşluğu belirtir
                    
                  }}
                  textAlign={'center'}
                >
                  <img src={kullanici.image} width={40} style={{alignSelf:'center'}}/>
                </Box>
              ))}
                   
                   
                </Box>

            </Box>
          
        </Box>
      </Modal>
    </div>
  );
}
