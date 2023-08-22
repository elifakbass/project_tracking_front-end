import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { usePersonel } from '../../context/PersonelContext';
import { getYorumlarByProjeId } from '../../api';

let yorums=[];
export default function AlignItemsList(props) {
    const {projeId,yorumlar}=props;

    const {personeller,guncel}=usePersonel();
yorums=yorumlar;
   React.useEffect(()=>{
    if(guncel==="yorum"){
        const getYorumlar =  () =>{
            getYorumlarByProjeId(projeId).then((res)=>{
             yorums=res
           })
       
         }
         getYorumlar();
    }

   },[guncel])
      
  return (
    <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
      {yorums.map((yorum,index) => (
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <img src={personeller[yorum.personel_id -1].image }  width={40}/>
          </ListItemAvatar>
          <ListItemText
            primary={personeller[yorum.personel_id -1].name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {yorum.icerik}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
