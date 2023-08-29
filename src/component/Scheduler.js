import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar"; // Doğru şekilde içe aktardığınızdan emin olun
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
import { monthlyProjects } from "../api";

const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color; // Etkinlik rengi
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style,
    };
  };

function Scheduler() {
    const [projectMonth,setProjectMonth]=useState([]);
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);

  const CustomEventTooltip = ({ event }) => (
    <div>
      <h3>{event.title}</h3>
    </div>
  );
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden 1 ekliyoruz
  console.log(typeof("2023-0"+currentMonth+"-01"));

  useEffect(()=>{
    const getEvents = async() =>{
        if(currentMonth < 10){
          
          const request={
            "startDate":"2023-0"+currentMonth+"-01",
            "endDate":"2023-0"+currentMonth+"-31"
          }
          const res=await monthlyProjects(request);
          res.map((r)=>{
            const dateString = r.sonTarih;
            const timestamp = Date.parse(dateString);
            const date = new Date(timestamp);
            let color="";
            if(r.durum==="10"){
                color="#FF9933"
            }
            else if(r.durum==="20"){
                color="#8569D4"
            }
            else{
                color="#3FB460"
            }
            setProjectMonth((current) =>[...current,
                {
                    'start':date,
                    'end':date,
                    'title':r.name,
                    'color':color,
                    'desc':r.icerik
                }
            ]);
          })
        }

    }
   getEvents();

  },[])

console.log(projectMonth);
  return (
    <div style={{ height: 700,backgroundColor:'#fff',marginTop:50 }}>
      <Calendar
        events={projectMonth}
        step={60}
        views={["month"]}
        defaultDate={new Date()}
        popup={true}
        onShowMore={(events, date) => this.setState({ showModal: true, events })}
        localizer={localizer}
        eventPropGetter={eventStyleGetter} // eventPropGetter kullanımı
        tooltipAccessor="desc" // Etkinlikler için açıklama özelliği
        components={{
          eventTooltip: CustomEventTooltip, // Özel tooltip bileşeni
        }}

      />
    </div>
  );
}

export default Scheduler;





