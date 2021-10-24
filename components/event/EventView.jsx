import React, { useState,useEffect } from 'react';
import { Container,Divider, Search,Card, Button, Modal,Header,Segment,Form,TextArea,List,Icon,Item} from 'semantic-ui-react'


import Comments from '../comment/Comments';
import moment from 'moment';

export default function EventView(props){

    const [event, setEvent] = useState(props.event)
    return (
        <>
            
            
            
            <Icon name="clock"/>{event.start.format("YYYY-MM-DD HH:mm")} {event.tz}
            <br/>
            <Icon name="map marker alternate"/>{event.location}
            <Divider/>
            {event.description}

            <Comments principal={props.principal} ctype={1} cid={event.id}/>
            
           
        </>
    )
}