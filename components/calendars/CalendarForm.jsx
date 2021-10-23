
import React, { useState,useEffect } from 'react';
import { Container,Divider, Search,Card, Button, Modal,Header,Form,TextArea,Checkbox,Icon} from 'semantic-ui-react'

function CalendarForm(props){
    const [name, setName] = useState(props.calendar ? props.calendar.name :'');
    const [description,setDescription] = useState(props.calendar ? props.calendar.description : '');  
    const [url, setUrl] = useState(props.calendar ? props.calendar.url : "")
    const [ispublic, setIspublic] = useState(props.calendar ? props.calendar.ispublic : false)

    function handleChange(e){
        console.log(e.target.value)
        if(e.target.name == "name") {
          setName(e.target.value);
        }else if(e.target.name == "description"){
    
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
    function submit(){
        props.submit(name, description,url, ispublic);
    }
    return (
        <Form>
                <Form.Field>
                <label>Name</label>
                <input name="name" value={name} onChange={handleChange}/>
                </Form.Field>
     
                <Form.Field>
                <label>Website</label>
                <input name="url" value={url} onChange={handleChange}/>
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

                <Button onClick={submit}>Save</Button>
            </Form>
    )
}
export {CalendarForm};