import React, { useEffect, useState } from 'react'
import { logs } from '../../api'
import TableLog from '../../component/admin/TableLog'
function LOg() {
  const [log,setLog]=useState([]);

  useEffect(()=>{
    const getLogs= async () =>{
      await logs().then((res)=>{
        setLog(res);
      });
    }
    getLogs();
  },[]);
  console.log(log);
  return (
    <div>
      <TableLog/>
    </div>
  )
}

export default LOg