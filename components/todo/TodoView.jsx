
import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Checkbox, Form, Button, Segment,Label, Modal,Header,Icon,Item,TextArea,Loader,Dimmer} from 'semantic-ui-react'
import moment from 'moment';
import { icevent } from "../../api/icevent";


const TodoView = (props) => {

    const [loading, setLoading] = useState(false)
    const [theTodo, setThetodo] = useState(props.todo);

    const [todo, setTodo] = useState(props.todo ? props.todo.todo : '');
    const [description, setDescription] = useState(props.todo ? props.todo.description : '');
    const [duedate, setDuedate] = useState(props.todo ? moment.unix(parseInt(props.todo.duedate)).format("YYYY-MM-DD") : moment().add(1,'day'));
    const [ispublic, setIspublic] = useState(props.todo ? props.todo.ispublic : false)
    const [checked, setChecked] = useState(props.todo.status == 9);
    
    const [openTodo, setOpenTodo] = useState(false)

    function handleChange(e){
        if(e.target.name == "todo"){
            setTodo(e.target.value)
        }else if(e.target.name == "description"){
            setDescription(e.target.value);
        }else if(e.target.name == "duedate"){
            setDuedate(e.target.value)
            
        }
    }

    function handleCheck (e, data) {
        console.log("checked? "+data.checked)
        if(data.name=='ispublic') {
            if(data.checked) setIspublic(true)
            else setIspublic(false)
        }else if(data.name="checked"){
            setChecked(true)
            if(data.checked) icevent.completeTodo(theTodo.id)
            
        }
    }

    function handleClick(e){
        console.log("click checkbox")

        setOpenTodo(true)
    }

    function update(){
        setThetodo({
            id :theTodo.id,
            parent :theTodo.parent,
            calendar :theTodo.calendar,
            todo : todo,
            description : description,
            duedate : duedate,
            owner :theTodo.owner,
            ispublic : ispublic,
            status :theTodo.status
        })
    }

    function changeTodo(){
        setLoading(true)
        icevent.editTodo(theTodo.id, todo, description,ispublic,moment(duedate).unix()).then(()=> {
            update()
            setLoading(false)
            setOpenTodo(false)
        })
        
    }
    return(
        <Item>
            <Item.Content>
                <Item.Header>{theTodo.toto}</Item.Header>
                <Item.Meta>
                    <Icon name='clock'/>{moment(parseInt(theTodo.duedate)).format("YYYY-MM-DD")} {theTodo.status == 9 && <Icon name="check"/>}
                </Item.Meta>
                <Item.Description>{theTodo.description}</Item.Description>
            </Item.Content>
        </Item>
    )
}

export default TodoView