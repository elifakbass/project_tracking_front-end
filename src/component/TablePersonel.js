import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useYonetici } from '../context/YoneticiContext';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deletePersonel } from '../api';
import Modal from '../component/ModalPersonelGuncelle'
import ModalSilme from './ModalSilme';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {

    const {personel,setPost}=useYonetici();
    console.log(personel);
    const [veriler,setVeriler]=React.useState([]);

    
  React.useEffect(() => {
    if(props.parametre===undefined || props.parametre===""){
      setVeriler(personel);
    }
    else{
      const filtered = personel.filter((row) => {
        return row.name.toLowerCase().startsWith(props.parametre.toLowerCase());
      });
      setVeriler(filtered);
    }
    
  }, [props.parametre,personel]);


  return (
    <TableContainer component={Paper} sx={{marginTop:15,maxWidth:1600,marginLeft:10}} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'></TableCell>
            <TableCell align="right">İsim</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Ünvan</TableCell>
            <TableCell align='right'>Yetkinlikler </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {veriler.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,height:'auto'
          }}
            >
              <TableCell align='center'>
                <img src={row.image} width={30} />
              </TableCell>
              <TableCell align="right" sx={{height:60}}>{row.name}</TableCell>
              <TableCell align="right" sx={{height:60}}>{row.department}</TableCell>
              <TableCell align="right" sx={{height:60}}>{row.unvan}</TableCell>
              <TableCell align="right" sx={{height:60}}>{row.yetkinlikler}</TableCell>
              <TableCell align="right" sx={{display:'flex',height:60}}>
                <Modal personel={row}/>
                <ModalSilme  entity={"personel"} id={row.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
