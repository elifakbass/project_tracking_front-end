import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { usePersonel } from '../../context/PersonelContext';
import { updateDurumGorev, updateDurumproje } from '../../api';


export default function ControlledOpenSelect(props) {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [color,setColor]=React.useState("#fff");

  const {setProjeDurum,projeDurum}=usePersonel();

 
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
    

    switch(event.target.value){
        case 10:
            setColor("#ff9933");
            setProjeDurum("10");


            break;
        case 20:
            setColor("#8569D4");
            setProjeDurum("20");



            break;
        case 30:
            setColor("#59A86F");
            setProjeDurum("30");

            break;        
    }

    const request={
        "durum":event.target.value
    }

    if(props.tablo === "proje"){
        await updateDurumproje(props.id,request)
    }
    else if (props.tablo ==="gorev"){
      await updateDurumGorev(props.id,request);
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
      <FormControl sx={{ minWidth: 120}}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{backgroundColor:color, color:"#fff",letterSpacing:1,height:30,width:160,fontSize:13}}
        >
         
          <MenuItem sx={{backgroundColor:"#FF9933", fontSize:13,color:"#fff",letterSpacing:1,height:30,width:160}} value={10}>Başlamadı</MenuItem>
          <MenuItem sx={{backgroundColor:"#8569D4",fontSize:13,color:"#fff",letterSpacing:1,height:30,width:160}} value={20}>Devam Etmekte</MenuItem>
          <MenuItem sx={{backgroundColor:"#59A86F",fontSize:13,color:"#fff",letterSpacing:1,alignContent:"start",height:30,width:160}}  value={30}>Tamamlandı</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
