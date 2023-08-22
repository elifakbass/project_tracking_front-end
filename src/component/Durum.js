import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useYonetici } from '../context/YoneticiContext';
import { updateGorev, updateProje } from '../api';


export default function ControlledOpenSelect(props) {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [color,setColor]=React.useState("#fff");

  const {setProjeDurum,projeDurum,setPost}=useYonetici();

 
  React.useEffect(()=>{


  },[projeDurum])

  React.useEffect(()=>{
    setAge(props.value);
    setProjeDurum(props.value);
    console.log(props.value);

    switch(props.value){
        case "10":
            setColor("#ff9933");
            break;
        case "20":
            setColor("#8569D4");
            break;
        case "30":
            setColor("#59A86F");
            break;        
    }


  },[])

  const handleChange = async (event) => {
    setAge(event.target.value);
    
    let durum="";
    switch(event.target.value){
        case 10:
            setColor("#ff9933");
            setProjeDurum("10");
            durum="10";

            break;
        case 20:
            setColor("#8569D4");
            setProjeDurum("20");
            durum="20";


            break;
        case 30:
            setColor("#59A86F");
            setProjeDurum("30");
            durum="30";
            break;        
    }
  if(props.entity==="proje"){
    const request={
      "name":props.row.name,
      "sonTarih":props.row.sonTarih,
      "icerik":props.row.icerik,
      "durum":durum
    }
    await updateProje(props.id,request);
//    setPost("proje");

  }
  if(props.entity==="gorev"){
    const request={
      "icerik":props.row.gorev,
      "durum":durum,
      "sonTarih":props.row.sonTarih
    }
    await updateGorev(props.row.id,request);
//    setPost("proje");

  }
    


   

  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <div>
      <FormControl sx={{ minWidth: 200}}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{backgroundColor:color, color:"#fff",letterSpacing:2,height:80,width:220,fontSize:17}}
        >
         
          <MenuItem sx={{backgroundColor:"#FF9933", fontSize:18,color:"#fff",letterSpacing:3,height:60}} value={10}>Başlamadı</MenuItem>
          <MenuItem sx={{backgroundColor:"#8569D4",fontSize:18,color:"#fff",letterSpacing:2,height:60}} value={20}>Devam Etmekte</MenuItem>
          <MenuItem sx={{backgroundColor:"#59A86F",fontSize:18,color:"#fff",letterSpacing:3,alignContent:"start",height:60}}  value={30}>Tamamlandı</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
