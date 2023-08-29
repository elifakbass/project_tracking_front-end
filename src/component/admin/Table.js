import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAdmin } from '../../context/AdminContext';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { deletYonetici } from '../../api';
import Drawer from './Drawer'
import ModalSilme from './ModalSilme';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CustomizedTables(props) {
    const {yoneticiler,setGuncel}=useAdmin();

    const [veriler,setVeriler]=React.useState([]);

    React.useEffect(() => {
        if(props.parametre===undefined || props.parametre===""){
          setVeriler(yoneticiler);
        }
        else{
          const filtered = yoneticiler.filter((row) => {
            return row.name.toLowerCase().startsWith(props.parametre.toLowerCase());
          });
          setVeriler(filtered);
        }
        
      }, [props.parametre,yoneticiler]);



  return (
    <TableContainer component={Paper} sx={{maxWidth:1600}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">İsim</StyledTableCell>
            <StyledTableCell align="right">Kurum Adı</StyledTableCell>
            <StyledTableCell align="right">Maximum Personel Sayısı</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {veriler.map((row) => (
            <StyledTableRow key={row.id} sx={{height:'auto'}}>
              <StyledTableCell component="th" scope="row" height={60}>
            <img src={row.image} width={30} />
              </StyledTableCell>
              <StyledTableCell align="right" height={60}>{row.name}</StyledTableCell>
              <StyledTableCell align="right" height={60}>{row.kurumAdi}</StyledTableCell>
              <StyledTableCell align="right" height={60}>{row.personelSayisi}</StyledTableCell>
              <StyledTableCell align="right" height={60}sx={{display:'flex'}} >
                <Drawer yonetici={row}/>
                <ModalSilme  entity= {"yonetici"} id={row.id} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
