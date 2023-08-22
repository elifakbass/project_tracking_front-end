import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function BasicTable(props) {
const  {gorevler,images}=props;

  return (
    <TableContainer component={Paper}sx={{marginBottom:5}}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sorumlu</TableCell>
            <TableCell align="right">Görev</TableCell>
            <TableCell align="right">Teslim Tarihi</TableCell>
            <TableCell align="right">Durum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gorevler.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={images[index]} width={20}/>
              </TableCell>
              <TableCell align="right">{row.icerik}</TableCell>
              <TableCell align="right">{row.sonTarih}</TableCell>
              <TableCell align="right" sx={row.durum=== "10" ? {width:30,height:8,backgroundColor:'#ff9933'} : row.durum==="20" ? {width:30,height:10,backgroundColor:'#8569D4'} 
            :   {width:30,height:10,backgroundColor:'#59A86F'}
            }>
                {
              row.durum==="30" ? "Tamamlandı" : row.durum==="10" ? "Başlamadı" :" Devam Etmekte"
             }
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}