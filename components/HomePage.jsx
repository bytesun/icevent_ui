import { icevent } from "../api/icevent";

import React, { useState,useEffect } from 'react';
import { render } from "react-dom";
import parseEvents from "./utils/parseEvents";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import { Menu,Dropdown,Button,Header,
    Divider,
    Icon, Modal,Form,
    Checkbox,
    TextArea,
    Loader,
    Dimmer
    } from 'semantic-ui-react'
  

    

import EventView from './event/EventView';


const localizer = momentLocalizer(moment);



const  HomePage = (props) => {
    const [loading, setLoading] = useState(false)
    const [principal, setPrincipal] = useState(props.principal)
    const [theday, setTheday] = useState(moment());

    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [start, setStart] = useState(moment().format("YYYY-MM-DD"));
    const [startime, setStartime] = useState(moment().format("HH:mm"))
    const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));
    const [timezone,setTimezone] = useState('UTC');
    const [location, setLocation ] = useState('');
    const [ispublic, setIspublic] = useState(false)
  
    const [theEvent, setTheEvent] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showEvent, setShowEvent] = useState(false);

    useEffect(()=>{

        fetchEvents(moment().startOf("month"),moment().endOf("month"));
        
      },[])

    function fetchEvents(start, end){
        console.log("fetch events: "+start +" - "+end)
       
          icevent.getEvents(start.unix(),end.unix()).then(events=>{
            const pevents = parseEvents(events)
            setEvents(pevents)
            
          })
       
      }

    function navigator(theday, view){
        console.log("navigate to "+theday)
        setTheday(moment(theday));
        fetchEvents(moment(theday).startOf(view),moment(theday).endOf(view))
    
      }
      function openEvent(e){
        console.log(e);
        setShowEvent(true)
        setTheEvent(e);
      }


  function selectDay(data){
    // if(signedIn){
    //   setStart(moment(data.start).format("YYYY-MM-DD"));
    //   setEnd(moment(data.end).format("YYYY-MM-DD"));
    //   setIsModalVisible(true)
    // }

  }
    
    return (
        <>
        <Dimmer active={loading} page><Loader inverted></Loader></Dimmer>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={['month', 'agenda']}
          events={events}
          style={{ height: "100vh" }}
          onSelectEvent={openEvent}
          selectable={true}
          onSelectSlot={selectDay}  
          onNavigate={navigator}
          popup={true}

          
        />
        {theEvent &&
        <Modal
        closeIcon
        open={showEvent}
        
        onClose={() => setShowEvent(false)}
        onOpen={() => setShowEvent(true)}
      >
        <Header icon='calendar' content={theEvent.title} />
               
        <Modal.Content>
              <EventView principal={principal} event={theEvent}/>
          
        </Modal.Content>
        {/* <Modal.Actions>
          <Button color='green' onClick={() => setShowEvent(false)}>
            <Icon name='checkmark' /> close
          </Button>
        </Modal.Actions> */}
      </Modal>}
        </>
    )
}

export default HomePage;