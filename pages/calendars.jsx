
import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Container,Divider,Dimmer,Loader,
     Label,Card, Button, Modal,Header,Form,TextArea,Checkbox,Icon
} from 'semantic-ui-react'

import { icevent } from "../api/icevent";
import  CalendarCard  from '../components/calendars/CalendarCard';

import  CalendarForm  from '../components/calendars/CalendarForm';

export default function CalendarList(props){

    const [loading, setLoading] = useState(false)
    const [activeLabel, setActiveLabel] = useState("public")
    const [calendars, setCalendars] = useState([])
    const [isShowMOdal, setIsShowMOdal] = useState(false)


    function reset(){
      setName('');
      setDescription('');
      setUrl('');

    }

    useEffect(()=>{
            fetchCalendars();            
        },[])

    const calist = calendars && calendars.map(cal => 
            <CalendarCard key={cal.id} principal={props.principal} calendar={cal} />
        )

  async function addCalendar(name, description,url, ispublic){
    console.log(name+" - "+description)
    setLoading(true)
    icevent.addCalendar(name, description,url,props.principal,ispublic).then(()=>
    {
        fetchCalendars();
        setLoading(false)
        reset();
    });

    setIsShowMOdal(false)
  }


  function fetchCalendars(){
    console.log("fetch calendars: ")
    if(props.principal){
        filterCalendars("my")
    }else{
        filterCalendars("public")
    }
    
  }

  function filterCalendars(filter){

    if(filter == "public"){
        icevent.getCalendars().then(cals=>{
            console.log("calendars: "+cals)
            setCalendars(cals)
            setActiveLabel("public")
        })
    }else if(filter == "my"){

        icevent.getMyCalendars(props.principal).then(cals=>{
            console.log("my calendars: "+cals)
            setCalendars(cals)
            setActiveLabel("my")
          })
    }else if(filter =="subscribed"){
        setCalendars([])
        setActiveLabel("subscribed")
    }
  }

    return(
        <Container>
            <Dimmer active={loading} page><Loader inverted></Loader></Dimmer>
            {props.principal &&
                <>
                <Button color="green" onClick={()=> setIsShowMOdal(true)}>New</Button>
                <Label as="a" size="medium" active={activeLabel == "public"} onClick={()=>filterCalendars("public")}><Icon name="tag" />Public</Label>
                <Label as="a" size="medium" active={activeLabel == "my"} onClick={()=>filterCalendars("my")}><Icon name="tag" />My</Label>
                <Label as="a" size="medium" active={activeLabel == "subscribed"} onClick={()=>filterCalendars("subscribed")}><Icon name="tag" />Subscribed</Label>
                </>
            }

            
        <Divider />
        <Card.Group stackable  itemsPerRow={4}>
            {calist}
            
        </Card.Group>

        <Modal
      
            onClose={() => setIsShowMOdal(false)}
            onOpen={() => setIsShowMOdal(true)}
            open={isShowMOdal}
            size='small'
            
            >
            <Header icon>
                New Calendar
            </Header>
            <Modal.Content>
                <CalendarForm submit={addCalendar}/>
            </Modal.Content>
            
            </Modal>
        </Container>
    )
}

