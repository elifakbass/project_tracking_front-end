import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Durum from '../component/Durum' 
import { useYonetici } from '../context/YoneticiContext';
import { deleteGorev, deleteProje, getGorevlerByProjeId, updateGorev, updateProje } from '../api';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import SilmeModal from './ModalSilme';

import ModalGorev from '../component/ModalGorev';

function createData(projeler,proje_sorumlu,gorevler_array,personel) {
  console.log(gorevler_array)
  let id;
  let name;
  let sorumlu
  let sonTarih;
  let durum;
  let icerik;
  

if(projeler !=null){
    id=projeler.id;
    name=projeler.name;
    sorumlu=proje_sorumlu;
    sonTarih=projeler.sonTarih;
    durum=projeler.durum;
    icerik=projeler.icerik;
  
}

let gorev = [];
let i=0;
  if(gorevler_array !== []){
    console.log(gorevler_array);
    gorevler_array.map((element,index)=>{
      gorev[i]={
        id:element.id,
        gorev:element.icerik,
        sorumlu:personel[element.sorumlu-1].image,
        sonTarih:element.sonTarih,
        durum:element.durum
      }
      i++;
    })
   

  }
  return {
    id,
    name,
    sorumlu,
    sonTarih,
    durum,
    icerik,
    gorevler: gorev,
  };

  
}

const durumlar=["Başlamadı","Devam Etmekte","Tamamlandı"];

function GorevRow(props){
  const {row} = props;
  const [editMode2, setEditMode2] = React.useState(null);

  const [gorevText,setGorevText]=React.useState(row.gorev);
  const [sonTarihGorev,setSonTarihGorev]=React.useState(row.sonTarih);

  const {projeDurum,setPost}=useYonetici();

  const enterEditMode2 = (rowIndex) => {
    setEditMode2(rowIndex);
  };

  const exitEditMode2 = async()=>{

    setEditMode2(null);
    let id=editMode2;
    
    const request={
      "icerik":gorevText,
      "sonTarih":sonTarihGorev,
      "durum":projeDurum
    }
    await updateGorev(id,request);


  }


return (
  <TableRow  sx={{maxHeight:80}}>

                      <TableCell component="th" scope="row" onClick={() => enterEditMode2(row.id)}>
                      {editMode2 === row.id ? (
                      
                      <input
                      style={{
                        width: '120px',
                        height: '30px',
                        border: `1px solid ${editMode2 ? 'purple' : '#ccc'}`,
                        borderRadius: '4px',
                        padding: '4px',
                    
                      }}

                        type="text"
                        value={gorevText}
                        onChange={(e) => {
                          setGorevText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            exitEditMode2();

                          }
                        }}
                        
                      />
                    ) : 
                       gorevText
                      }
                      </TableCell>
                      <TableCell align="right"><img style={{width:"30px"}} src={row.sorumlu} /></TableCell>
                      <TableCell align='right' onClick={() => enterEditMode2(row.id)}>
                        {editMode2 === row.id ? (
                        <input
                        style={{
                          width: '120px',
                          height: '30px',
                          border: `1px solid ${editMode2 ? 'purple' : '#ccc'}`,
                          borderRadius: '4px',
                          padding: '4px',
                      
                        }}

                          type="text"
                          value={sonTarihGorev}
                          onChange={(e) => {
                            setSonTarihGorev(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              exitEditMode2();

                            }
                          }}
                          
                        />
                      ) : 
                          sonTarihGorev
                        }
                        </TableCell>
                      <TableCell align="center" >
                        <Durum value={row.durum} entity={"gorev"} row={row}/>
                      </TableCell>

                      <TableCell align='right'>
                        <SilmeModal entity={"gorev"} id={row.id}/>
                      </TableCell>
                    </TableRow>

)



}
  

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const {setPost}=useYonetici();
  const [name,setName]=React.useState(row.name);
  const [sonTarih,setSonTarih]=React.useState(row.sonTarih);
  const [icerik,setIcerik]=React.useState(row.icerik);
  const {projeDurum}=useYonetici();

  const [editMode, setEditMode] = React.useState(null);


  const enterEditMode = (rowIndex) => {
    setEditMode(rowIndex);
  };
  
  const exitEditMode =async () => {
    let id=editMode;

    setEditMode(null);
    const update={
      "name":name,
      "sonTarih":sonTarih,
      "icerik":icerik,
      "durum":projeDurum

    }

    await updateProje(id,update);

  };



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset'},maxHeight:80 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" onClick={() => enterEditMode(row.id)}>
        {editMode === row.id ? (
        <input
        style={{
          width: '120px',
          height: '30px',
          border: `1px solid ${editMode ? 'purple' : '#ccc'}`,
          borderRadius: '4px',
          padding: '4px',
      
        }}

          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              exitEditMode();

            }
          }}
          
        />
      ) : 
        name
        }
        </TableCell>
        <TableCell align="right"><img style={{width:"30px"}} src={row.sorumlu} /></TableCell>
        <TableCell align='right' onClick={() => enterEditMode(row.id)}>
        {editMode === row.id ? (
        <input
        style={{
          width: '120px',
          height: '30px',
          border: `1px solid ${editMode ? 'purple' : '#ccc'}`,
          borderRadius: '4px',
          padding: '4px',
      
        }}

          type="text"
          value={sonTarih}
          onChange={(e) => {
            setSonTarih(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              exitEditMode();

            }
          }}
          
        />
      ) : 
          sonTarih
        }
        </TableCell>
        <TableCell align="center" ><Durum id={row.id} row={row} value={row.durum} entity={"proje"}/></TableCell>
        <TableCell align='center' onClick={() => enterEditMode(row.id)}>
        {editMode === row.id ? (
        <input
        style={{
          width: '200px',
          height: '30px',
          border: `1px solid ${editMode ? 'purple' : '#ccc'}`,
          borderRadius: '4px',
          padding: '4px',
      
        }}

          type="text"
          value={icerik}
          onChange={(e) => {
            setIcerik(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              exitEditMode();

            }
          }}
          
        />
      ) : 
          icerik
        }
        </TableCell>
        <TableCell align='right'>
        <SilmeModal entity={"proje"} id={row.id}/> </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 ,backgroundColor:"#e6e6e6"}} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginLeft:10,marginTop:3 ,backgroundColor:"#fff",marginBottom:2}}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Gorev</TableCell>
                    <TableCell align="right">Sorumlu</TableCell>
                    <TableCell align="right">Son Tarih</TableCell>
                    <TableCell align="center">Durum</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                
                  {row.gorevler.map((historyRow,index) => (                  
                    <GorevRow row={historyRow} key={index}/>                    
                    
                  ))}

                  
                      <ModalGorev id={row.id}/>

                    
   
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    durum: PropTypes.string.isRequired,
    sonTarih: PropTypes.string.isRequired,
    icerik: PropTypes.string.isRequired,
    gorevler: PropTypes.arrayOf(
      PropTypes.shape({
        gorev: PropTypes.string.isRequired,
        sorumlu: PropTypes.string.isRequired,
        sonTarih: PropTypes.string.isRequired,
        durum: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};


export default function ProjeTable(props) {
  const {proje,gorev,personel}=useYonetici();
  const [rows,setRows]=React.useState([]);
  const [veriler,setVeriler]=React.useState([]);

  
  console.log(proje);
  console.log(gorev);
  console.log(personel)

  React.useEffect(()=>{
    setRows([]);
    if(proje.length>0){
      proje.map(async(p,index)=>{
        console.log(p);
       
          p.map(async(project)=>{
            const gorevler= await getGorevlerByProjeId(project.id);
            console.log(gorevler);
            const row=createData(project,personel[index].image,gorevler,personel);
            setRows((current) => [...current,row]);

          })
        

      })
    }

  },[proje])
  console.log(rows);

  React.useEffect(() => {
    if(props.parametre===undefined || props.parametre===""){
      setVeriler(rows);
    }
    else{
      const filtered = rows.filter((row) => {
        return row.name.toLowerCase().startsWith(props.parametre.toLowerCase());
      });
      setVeriler(filtered);
    }
    
  }, [props.parametre,rows]);

  return (
    <TableContainer component={Paper} sx={{marginTop:10}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Proje</TableCell>
            <TableCell align="right">Sorumlu</TableCell>
            <TableCell align="right">Son Tarih</TableCell>
            <TableCell align="center">Durum</TableCell>
            <TableCell align="center">İçerik</TableCell>
            <TableCell align='right'/>
          </TableRow>
        </TableHead>
        <TableBody>
          {veriler.map((row,index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
