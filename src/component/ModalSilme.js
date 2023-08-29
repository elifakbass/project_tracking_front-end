import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useYonetici } from '../context/YoneticiContext';
import { deleteGorev, deletePersonel, deleteProje } from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {entity,id} =props;

  const {setPost} =useYonetici();

  const handleDelete = async(id) =>{
    if(entity==="proje"){ 
        setPost("");
        await deleteProje(id);
        setPost("proje");
       
    }
    else if(entity === "gorev"){
         setPost("");
        await deleteGorev(id);
        setPost("proje");
    }
    else if(entity === "personel"){
        setPost(false);
        await deletePersonel(id);
        setPost("personel");
    }
  }

  return (
    <div>
       <button onClick={handleOpen} style={{backgroundColor:'#fff',border:'1px solid #ccc',cursor:'pointer'}} > <CloseIcon htmlColor='#e60000'/> </button> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {entity.toUpperCase()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Id:{id} {entity} silmek istediğinize emin misiniz?
          </Typography>
          <div style={{display:'flex',marginTop:20,justifyContent:'end'}}>
          <Button onClick={() => handleDelete(id)} variant='contained' sx={{marginRight:3}}>
            Evet
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Hayır
          </Button>
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}
