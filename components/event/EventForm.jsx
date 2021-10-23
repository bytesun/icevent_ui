
import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Menu,Dropdown,Button,Header,
  Divider,
  Icon, Modal,Form,
  Checkbox,
  TextArea
  } from 'semantic-ui-react'


import moment from 'moment';

import 'semantic-ui-css/semantic.min.css'
import "react-big-calendar/lib/css/react-big-calendar.css";




function EventForm (props) {
  
 
  const [title, setTitle] = useState(props.event? props.event.title : '');
  const [description,setDescription] = useState(props.event? props.event.description : '');
  const [start, setStart] = useState(props && props.start ? props.start : props.event? props.event.start.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"));
  const [startime, setStartime] = useState(props.event ? props.event.start.format("HH:mm") : moment().format("HH:mm"))
  const [end, setEnd] = useState(props && props.start ? props.start : moment().format("YYYY-MM-DD"));
  const [timezone,setTimezone] = useState(props.event? props.event.tz : 'UTC');
  const [location, setLocation ] = useState(props.event? props.event.location : '');
  const [ispublic, setIspublic] = useState(props.event? props.event.ispublic : false)


  function handleChange(e){
    console.log(e.target.value)
    if(e.target.name == "title") setTitle(e.target.value);
    else if(e.target.name == "description") setDescription(e.target.value);
    else if(e.target.name == "location") setLocation(e.target.value);
    else if(e.target.name == "start") {
      setEnd(e.target.value);
      setStart(e.target.value);
    }else if(e.target.name == "startime"){
      setStartime(e.target.value)
    }else if(e.target.name == "timezone"){
      setTimezone(e.target.value)
    }else if(e.target.name == "ispublic"){
      console.log(e.target.value)
    }
  }

  function handleCheck (e, data) {
    console.log("checked? "+data.checked)
    if(data.name=='ispublic') setIspublic(data.checked)
  }
  
  function reset(){
    setTitle('');
    setDescription('');
    setLocation('');

  }
 
  function submit(){
      console.log("submit event: title="+title+", desc="+description+", start="+start+":"+startime+", tz="+timezone+",loc="+location+",owner="+props.principal+",ispub="+ispublic);
      props.submit(title, description,moment(start+" "+startime).unix(),moment(start+" "+startime).unix(),timezone,location,props.principal,ispublic)
      reset();
  }

  return (
   
      <Form>
        <Form.Field>
          <label>Title</label>
          <input name="title" value={title} onChange={handleChange}/>
        </Form.Field>
        <Form.Group>
          <Form.Input name="start" type="date" value={start} onChange={handleChange}/>
          <Form.Input name="startime" type="time" value={startime} onChange={handleChange}/>
          <Form.Input name="timezone"  value={timezone} onChange={handleChange}/>
        </Form.Group>
        
        <Form.Field>
          <label>Location</label>
          <input name="location" value={location} onChange={handleChange}/>
          
        </Form.Field>

        <Form.Field
          control={TextArea}
          label='Description'
          name="description"
          value={description} onChange={handleChange}
        />

        <Form.Field
          control={Checkbox}
          label='ispublic'
          name="ispublic"
          checked={ispublic}
          onChange={handleCheck}
        />

        <Form.Button  onClick={submit}>Submit</Form.Button>
      </Form>
    
  )
};

export {EventForm}