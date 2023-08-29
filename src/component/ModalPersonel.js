import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useYonetici } from '../context/YoneticiContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { savePersonel, saveProje } from '../api';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
const department=["YAZILIM","AR-GE","İDARİ İŞLER","DİJİTAL PAZARLAMA","DİĞER"];
const unvanlar=["BİLGİSAYAR MÜHENDİSİ","YAZILIM MÜHENDİSİ","SEO UZMANI","SOSYAL MEDYA UZMANI","DİĞER"]
export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [departman,setDepartman]=React.useState("");
  const  [unvan,setUnvan]=React.useState("");
  const [checked,setChecked]=React.useState(false);
  const [checked2,setChecked2]=React.useState(false);
  const [checked3,setChecked3]=React.useState(false);
  const [checked4,setChecked4]=React.useState(false);
  const [yetkinlikler,setYetkinlikler]=React.useState([]);
  const [email,setEmail]=React.useState();
  const [password,setPassword]=React.useState();
  const [name,setName]=React.useState();

  const {setPost}=useYonetici();


const handleCheckboxChange = (event) =>{
    switch(event.target.value){
        case "java":
            setChecked(event.target.checked);
            break;
        case "C++":
            setChecked2(event.target.checked);
            break;
        case "C":
            setChecked3(event.target.checked);
            break;
        case ".NET":
            setChecked4(event.target.checked);
            break;            
    }
    
    if(event.target.checked===true){
        setYetkinlikler((current ) => [...current,event.target.value]);

    }
    else if(event.target.checked===false){
        const yetkinlik=yetkinlikler.filter(yetkinlikler => yetkinlikler !== event.target.value);
        console.log(yetkinlik);
        setYetkinlikler(yetkinlik)
    }
    
}


  const handleChange =(event)=>{
    setDepartman(event.target.value);

  }

  const handleChange2 =(event)=>{
    setUnvan(event.target.value);

  }

  console.log(checked);
  console.log(yetkinlikler);   
  console.log(unvan); 

React.useEffect(()=>{
    
   


},[yetkinlikler])


const handleSubmit =async ()=>{
    const yetkinlik=yetkinlikler.join(", ");
    const id=parseInt(localStorage.getItem("user-id"));
    console.log(yetkinlik);
    const request={
        "name":name,
        "email":email,
        "password":password,
        "department":departman,
        "unvan":unvan,
        "yetkinlikler":yetkinlik,
        "yonetici_id":id,
        "image":"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

    }
    await savePersonel(request);
    setPost("personel");
    handleClose();
    

}

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[400]),
    backgroundColor: purple[400],
    '&:hover': {
      backgroundColor: purple[500],
    },
    marginTop:30,
    marginLeft:60,
    height:50
  }));


  return (
    <div >
      <ColorButton onClick={handleOpen} variant="contained">Personel Ekle</ColorButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        
      >  
        <Box sx={style}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:30}}>
            <Typography variant='body1' color='#333333'
            >YENİ PERSONEL OLUŞTUR</Typography>
            <Button onClick={handleClose} >
                <CloseIcon htmlColor='red'/>
            </Button>

            </div>
        <form>

        <TextField
            label="isim"
            name='isim'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(event)=>setName(event.target.value)}
         
            fullWidth
        />

        <TextField
            label="E-mail"
            name='email'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(event)=>setEmail(event.target.value)}
         
            fullWidth
        />
        
     


        <TextField
            label="Password"
            name='password'
            variant="outlined"
            sx={{marginBottom: 2,marginTop:2}}
            onChange={(event)=>setPassword(event.target.value)}
            fullWidth
        />

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Departman</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={departman}
            label="departman"
            onChange={handleChange}
        >
            {
                department.map((departman, index) => (
                    <MenuItem value={departman} key={index}>{departman}</MenuItem>
                ))
            }
        </Select>
        </FormControl>

        <FormControl fullWidth sx={{marginTop:5}}>
        <InputLabel id="demo-simple-select-label">Ünvan</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unvan}
            label="departman"
            onChange={handleChange2}
        >
            {
                unvanlar.map((unvan, index) => (
                    <MenuItem value={unvan} key={index}>{unvan}</MenuItem>
                ))
            }
        </Select>
        </FormControl>

        <FormGroup style={{ display: 'flex', flexDirection: 'row',marginTop:20 }}>
            
            <FormControlLabel 
            control=
            {
            <Checkbox 
            checked={checked}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
            value={"java"}
            
            />} 
            label="JAVA" />

            <FormControlLabel 
            control=
            {
            <Checkbox 
            checked={checked2}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
            value={"C++"}
            
            />} 
            label="C++" />

        <FormControlLabel 
            control=
            {
            <Checkbox 
            checked={checked3}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
            value={"C"}
            
            />} 
            label="C" />

            <FormControlLabel 
            control=
            {
            <Checkbox 
            checked={checked4}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
            value={".NET"}
            
            />} 
            label=".NET" />

        </FormGroup>

       

        </form>

        

        <Button onClick={handleSubmit} sx={{marginTop:3,marginBottom:2}} variant='contained' fullWidth>
            Kaydet
        </Button>
        </Box>
      </Modal>
    </div>
  );
}
