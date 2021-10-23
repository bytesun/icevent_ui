
import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Container,Divider, Search,Card, Button, Modal,Header,Form,TextArea,Loader,Dimmer,Icon} from 'semantic-ui-react'

import { icevent } from "../../api/icevent";

import { EventForm } from "../event/EventForm";
import { CalendarForm } from "./CalendarForm";
import { CalendarView } from "./CalendarView";

function CalendarCard(props){

    const [loading, setLoading] = useState(false)
    const [isShowMOdal, setIsShowMOdal] = useState(false)
    const [isShowCalModal, setIsShowCalModal] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)

    const [calendar, setCalendar] = useState(props.calendar);
    
 
    const [name, setName] = useState('');
    const [description,setDescription] = useState('');  
    const [url, setUrl] = useState("")
    const [ispublic, setIspublic] = useState(false)

    function reset(){
      setName('');
      setDescription('');
      setUrl('');

    }
    
  function handleChange(e){
    console.log(e.target.value)
    if(e.target.name == "name") setName(e.target.value);
    else if(e.target.name == "description"){

     setDescription(e.target.value);
    }else if(e.target.name == "url"){
        setUrl(e.target.value)
    }else if(e.target.name == "ispublic"){
      console.log(e.target.value)
    }
  }
  function handleCheck (e, data) {
    console.log("checked? "+data.checked)
    if(data.name=='ispublic') setIspublic(data.checked)
  }


  async function addEvent(title, description,start,end,timezone,location,principal,ispublic){
       icevent.addEvent(calendar.id,title, description,start,end,timezone,location,principal,ispublic).then(
      ()=>{
        
        reset();
      }
      
    );
    setIsShowMOdal(false)
  }
  
  function updateCalendar(name, description,url, ispublic){

    icevent.updateCalendar(calendar.id,name, description, url, props.principal,calendar.isverified,ispublic,calendar.status).then(()=>{
      
    })
    setCalendar({
      id:calendar.id,
      owner: calendar.owner,
      status: calendar.status,
      isverified: calendar.isverified,
      name,
      description,
      url,
      ispublic,

    })
    setIsShowCalModal(false)
  }

  function subscribe(){
    
  }
    return(
        <>
     
        <Card>
            <Card.Content>
               
                <Card.Header as="a" onClick={()=>setOpenCalendar(true)}>
                    {calendar.isverified && <Icon color="green" name="checkmark box"/>}
                    {calendar.name}</Card.Header>
                <Card.Meta>{calendar.url}</Card.Meta>
                <Card.Description>
                {calendar.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                
                {props.principal && calendar.owner == props.principal && <Button onClick={()=>setIsShowMOdal(true)} icon="plus"/>}
                {props.principal && calendar.owner == props.principal && <Button onClick={()=>setIsShowCalModal(true)} icon="edit"/>}
                {props.principal && calendar.owner != props.principal && <Button onClick={subscribe} icon="rss" />}
      
            </Card.Content>
            </Card>

            <Modal
      
                onClose={() => setIsShowMOdal(false)}
                onOpen={() => setIsShowMOdal(true)}
                open={isShowMOdal}
                size='small'
                
                >
                <Header icon>
                    New Event
                </Header>
                <Modal.Content>
                    <EventForm  principal={props.principal} submit={addEvent}/>
                </Modal.Content>
                
                </Modal>

                <Modal
      
                  onClose={() => setIsShowCalModal(false)}
                  onOpen={() => setIsShowCalModal(true)}
                  open={isShowCalModal}
                  size='small'
                  
                  >
                  <Header icon>
                      Update Calendar
                  </Header>
                  <Modal.Content>
                      <CalendarForm calendar={calendar}  principal={props.principal} submit={updateCalendar}/>
                  </Modal.Content>
                  
                  </Modal>

                  <Modal
      
                  onClose={() => setOpenCalendar(false)}
                  onOpen={() => setOpenCalendar(true)}
                  open={openCalendar}
                  size='large'
                  
                  >
                  <Header icon>
                      {calendar.name}
                  </Header>
                  <Modal.Content>
                      <CalendarView calendar={calendar} />
                  </Modal.Content>
                  
                  </Modal>
            </>
    )
}

export {CalendarCard}