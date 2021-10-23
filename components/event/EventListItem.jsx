import React, { useState,useEffect } from 'react';
import { Container,Divider, Search,Card, Button, Modal,Header,Segment,Form,TextArea,List,Icon,Item} from 'semantic-ui-react'

import moment from 'moment';

export default function EventListItem(props){

    const [event, setEvent] = useState(props.event)
    return (
        <Item key={event.id} image>
            <Item.Image>
                <Card>
                    <Card.Content textAlign="center">
                        <Card.Header>{moment(event.start).format("(ddd) MMM DD")}</Card.Header>
                        <Card.Meta>{moment(event.start).format("hh:mm a")} {event.tz}</Card.Meta>
                    </Card.Content>
                </Card>
            </Item.Image>
            
            <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Meta><Icon name="marker"/> {event.location} </Item.Meta>
                <Item.Description>
                    <p dangerouslySetInnerHTML={{__html: event.description}} ></p>
                </Item.Description>
            </Item.Content>
        </Item>
    )
}