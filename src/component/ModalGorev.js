import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TableCell, TableRow, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useYonetici } from '../context/YoneticiContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { saveGorev, saveProje } from '../api';
import CloseIcon from '@mui/icons-material/Close';



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
  const [sonTarih,setSonTarih]=React.useState("");
  const [icerik,setIcerik]=React.useState("");
  const [sorumlu,setSorumlu]=React.useState();
  const [project,setProject]=React.useState();

  const {personel,setPost,proje}=useYonetici();

  console.log(proje);

  const handleChange =(event)=>{
    setSorumlu(event.target.value);

  }


React.useEffect(()=>{
    if(personel != null){
        let i=0;
        personel.map((p)=>{
            name[i]=p.name;
            console.log(p.name)
        })
    }


},[])

const handleSubmit =async ()=>{
  setPost("");
    const request={
        "name":isim,
        "sonTarih":sonTarih.$d,
        "durum":"10",
        "icerik":icerik,
        "sorumlu":sorumlu,
        "proje":props.id
    }
    await saveGorev(request);
    setPost("proje");
    handleClose();

}


  return (
    <div style={{display:'inline-block'}}>
    <TableRow sx={{backgroundColor:'#fff',height:20,cursor:'pointer'}} >
       <Button sx={{marginLeft:5}} onClick={handleOpen}>
         + Görev Ekle
       </Button>
       </TableRow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        
      >  
        <Box sx={style}>
            <div style={{display:'flex'}}>
            <Typography sx={{marginBottom:4,marginRight:30}}
            >YENİ GÖREV OLUŞTUR</Typography>
            <Button onClick={handleClose} sx={{marginTop:-10 ,display:"inline-block"} }>
                <CloseIcon/>
            </Button>

</div>
        <form>
        <TextField
            label="Görev İsmi"
            name='isim'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(e) => setIsim(e.target.value)}
            fullWidth
        />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker 
            label="Teslim Tarihi"
            value={sonTarih}
             onChange={(newValue) => setSonTarih(newValue)}
            
            />
        </DemoContainer>
       </LocalizationProvider>


        <TextField
            label="Proje İçeriği"
            name='içerik'
            variant="outlined"
            sx={{marginBottom: 2,marginTop:2}}
            onChange={(e) => setIcerik(e.target.value)}
            fullWidth
        />
        </form>

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Personel</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sorumlu}
            label="personel"
            onChange={handleChange}
            sx={{marginBottom:2}}
        >
            {
                personel.map((p, index) => (
                    <MenuItem value={p.id} key={index}>{p.name}</MenuItem>
                ))
            }
        </Select>
        </FormControl>

        

        <Button onClick={handleSubmit} sx={{marginTop:3,marginBottom:2}} variant='contained' fullWidth>
            Kaydet
        </Button>
        </Box>
      </Modal>
    </div>
  );
}
