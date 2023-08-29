import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateYonetici } from '../../api';
import { useAdmin } from '../../context/AdminContext';


export default function TemporaryDrawer( props) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    
    setState({ ...state, [anchor]: open });
  };
  
const {yonetici}=props;
const [isim,setIsim]=React.useState();
const [kurumAdi,setKurumAdi]=React.useState();
const [personelCount,setPersonelCount]=React.useState();
const {setGuncel}=useAdmin();

React.useEffect(()=>{
    setPersonelCount(yonetici.personelSayisi);
    setKurumAdi(yonetici.kurumAdi);
    setIsim(yonetici.name);

},[])
console.log(yonetici);

const handleSubmit = async () =>{
    const personelSayisi=parseInt(personelCount);

    const request={
        "name":isim,
        "personelSayisi":personelSayisi,
        "kurumAdi":kurumAdi
    }

    await updateYonetici(yonetici.id,request);
    setGuncel("yonetici");
    setState({ ...state, ['right']: false });
}

  const list = (anchor) => (
    <Box
      sx={{ width: 500,marginTop:9,borderRadius:3}}
      role="presentation"

    >
        <Box width={500} height={110} sx={{backgroundColor:'#1a1a1a',borderBottomLeftRadius:4}}>
            <div style={{display:'flex' , justifyContent:'space-between'}}>
            <Typography variant='h6' sx={{fontSize:22,color:'#fff',paddingTop:2,paddingLeft:2,letterSpacing:1}}>
                YÖNETİCİ GÜNCELLE
            </Typography>
            <Button onClick={toggleDrawer(anchor,false)}>
                <CloseIcon htmlColor='#fff'/>
            </Button>
            </div>
            <Typography variant='body2' sx={{paddingTop:2,paddingLeft:2,letterSpacing:1,color:'#fff',fontSize:17}}>
                {yonetici.name.toUpperCase()}
            </Typography>
        </Box>

    <div style={{marginTop:25,marginLeft:20}}>
        <div>
        <TextField id="isim" label="Yönetici İsmi" variant="standard" fullWidth sx={{marginBottom:3}} value={isim} 
        onChange={(event)=> setIsim(event.target.value)}
        />
        </div>
        <div>
        <TextField id="kurumAdi" label="Kurum İsmi" variant="standard" fullWidth sx={{marginBottom:3}} value={kurumAdi}
        onChange={(event)=> setKurumAdi(event.target.value)}
        />
        </div>
        <div>
        <TextField id="personelSayisi" label="Personel Sayisi" variant="standard" fullWidth sx={{marginBottom:3}} value={personelCount}
        onChange={(event)=> setPersonelCount(event.target.value)}
        />
        </div>
    </div>
    <Button
        sx={{marginTop: 4, color: '#fff', backgroundColor: '#1a1a1a', marginLeft: 6, marginRight: 3, width: 400, ":hover": { backgroundColor: '#000' }}}
        onClick={handleSubmit }
        >
        KAYDET
        </Button>
      
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <EditIcon/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}