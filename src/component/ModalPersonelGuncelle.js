import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useYonetici } from '../context/YoneticiContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { savePersonel, updatePersonel } from '../api';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';

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
  const [name,setName]=React.useState();

  const {setPost}=useYonetici();
  const {personel} = props;


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
console.log(yetkinlikler);

  const handleChange =(event)=>{
    setDepartman(event.target.value);

  }

  const handleChange2 =(event)=>{
    setUnvan(event.target.value);

  }



React.useEffect(()=>{
    setName(personel.name);
    setDepartman(personel.department);
    setUnvan(personel.unvan);
    const yetkinlik = personel.yetkinlikler.split(",").map(yetki => yetki.trim()); // Boşlukları kaldır
   console.log(yetkinlik);
   setYetkinlikler(yetkinlik);

   yetkinlik.map((yetki)=>{
    const y=yetki.toLowerCase();
    
    switch(y){
        case "java":
            setChecked(true);
            break;
        case "c++":
            setChecked2(true);
            break;
        case "c":
            setChecked3(true);
            break;
        case ".net":
            setChecked4(true);
            break;

    }
   })


},[])


const handleSubmit =async ()=>{
    const yetkinlik=yetkinlikler.join(", ");
    const id=parseInt(localStorage.getItem("user-id"));
    console.log(yetkinlik);
    const request={
        "name":name===undefined ? personel.name : name,
        "department":departman=== "" ? personel.department : departman ,
        "unvan":unvan=== "" ? personel.unvan : unvan,
        "yetkinlikler":yetkinlikler.length === 0 ? personel.yetkinlikler : yetkinlik,

    }

    await updatePersonel(personel.id,request);
    setPost("personel");
    handleClose();

}



  return (
    <div >
      <Button onClick={handleOpen}>
        <EditIcon htmlColor='#002b80'/>
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
            >PERSONEL GÜNCELLE</Typography>
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
            value={name}
            onChange={(event)=>setName(event.target.value)}
         
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
            GÜNCELLE
        </Button>
        </Box>
      </Modal>
    </div>
  );
}
