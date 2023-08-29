import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { usePersonel } from '../../context/PersonelContext';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppsIcon from '@mui/icons-material/Apps';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Durum from './Select'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colors } from '@mui/material';
import { getGorevlerByProjeId, getYorumlarByProjeId } from '../../api';
import Modal from '../personel/Modal';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
let gorev=[];
export default function BasicCard(props) {

  const {proje,index} =props;
  console.log(index);
  const {kullanici,personeller}=usePersonel();
  const [personelImage,setPersonelImage]=React.useState([]);
  const [yorumlar,setYorumlar]=React.useState([]);
  const [projeGorev,setProjeGorev]=React.useState([]);
  const [allImages,setAllImages]=React.useState([]);

  React.useEffect(()=>{
    const getGorevlerProjeId = async () =>{
        await getGorevlerByProjeId(proje.id).then((gorev)=>{
          console.log(gorev);
            setProjeGorev(gorev);
        });
    }
    getGorevlerProjeId();


    const getYorumlar =  () =>{
      getYorumlarByProjeId(proje.id).then((res)=>{
       setYorumlar(res);
     })
 
   }
   getYorumlar();

   
  },[]);

  console.log(projeGorev);
  React.useEffect(()=>{
    const getUniquePersonelImages = () => {
      const uniqueImages = new Set();
      
      projeGorev.forEach((gorev) => {
        const personel = personeller.find((personel) => personel.id === gorev.sorumlu);
        if (personel) {
          uniqueImages.add(personel.image);
          setAllImages((current)=>[...current,personel.image]);
        }
      });
  
      setPersonelImage([...uniqueImages]);
    };
  
    getUniquePersonelImages();

  },[projeGorev])


  console.log(projeGorev);
 
  return (
    <Card sx={{ minWidth: 275 ,marginRight:10,maxHeight:520}}>
      <CardContent>
        
        <Typography variant="h6" component="div" sx={{color:'#363636'}}>
          {proje.name} / PROJE
        </Typography>
          <div style={{display:'flex',marginTop:40}}>
            <PersonIcon/>
            <Typography variant='body2' color={'#464646'} sx={{marginLeft:1,marginTop:0.5}}> Sorumlu </Typography>
            <span style={{width:'150px' ,height:'30px',backgroundColor:'#f2f2f2',marginLeft:'40px'}}>
              <img src={kullanici.image} width={30} style={{marginLeft:60}} />
            </span>
          </div>
          <div style={{display:'flex',marginTop:30}}>
            <AppsIcon/>
            <Typography variant='body2' color={'#464646'} sx={{marginLeft:1,marginTop:0.5,marginRight:6}}> Durum </Typography>
            <Durum value={proje.durum} tablo={"proje"} id={proje.id}/>
          </div>
          <div style={{display:'flex',marginTop:30}}>
            <AssignmentIcon/>
            <Typography variant='body2' color={'#464646'} sx={{marginLeft:1,marginTop:0.5,marginRight:5}}> Detaylar </Typography>
            <span style={{backgroundColor:'#f2f2f2',width:160}}>
            <Typography variant='body2' color={'#464646'} sx={{marginTop:0.5,height:10,marginBottom:10,width:160}}>
              {proje.icerik}
            </Typography>
            </span>
          </div>
          <div style={{display:'flex',marginTop:30}}>
            <PersonIcon/>
            <Typography variant='body2' color={'#464646'} sx={{marginLeft:1,marginTop:0.5}}> Çalışanlar </Typography>
            <span
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '160px',
              height: '30px',
              backgroundColor: '#f2f2f2',
              marginLeft: '25px',
            }}
          >
            {personelImage && personelImage.length > 0 ? (
              personelImage.map((g, gIndex) => (

                <img
                  key={gIndex}
                  src={g}
                  width={30}
                  style={{ marginLeft:'10px'}}
                />

              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                Çalışan Yok
              </Typography>
            )}

          </span>
          </div>
          <div style={{display:'flex',marginTop:30}}>
            <CalendarMonthIcon/>
            <Typography variant='body2' color={'#464646'} sx={{marginLeft:1,marginTop:0.5,marginRight:2}}> Teslim Tarihi </Typography>
            {
              proje.durum === "30" ? <CheckCircleIcon sx={{color:'green'}}/> :<AccessTimeFilledIcon sx={{color:'#a366ff'}}/>
            }
            <span style={{width:'130px' ,height:'30px',backgroundColor:'#f2f2f2',marginLeft:'8px'}}>
            <Typography variant='body2' sx={{marginLeft:2,marginTop:0.5}}>
              {proje.sonTarih}
            </Typography>
            </span>
          </div>
      </CardContent>

      <Modal gorevler={projeGorev} projeId={proje.id} proje={proje} images={personelImage} yorumlar={yorumlar}/>

    </Card>
  );
}
