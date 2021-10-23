import React, { useState,useEffect } from 'react';
import { Container,Divider, Search,Card, Button, Modal,Header,Segment,Form,TextArea,List,Icon,Item} from 'semantic-ui-react'

import { icevent } from "../../api/icevent";
import parseEvents from '../utils/parseEvents';
import EventListItem from '../event/EventListItem';

function CalendarView(props){
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        icevent.getCalEvents(props.calendar.id).then(events=>{
            
            let calevents = parseEvents(events)
            console.log("calendar's events:"+calevents);
            setEvents(calevents);
        })
      
    },[])

    const eventList = events.map((event)=>
       <EventListItem event={event} />
    )
    return (
        <>
        {props.calendar.description}
        <Divider />
        <Item.Group divided>
            {eventList}
        </Item.Group>
        </>
    )
}

export {CalendarView}