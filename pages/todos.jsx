
import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Checkbox, Form, Container, 
    Dimmer,Loader,
    Label,Icon, Divider} from 'semantic-ui-react'
import moment from 'moment';
import { icevent } from "../api/icevent";
import { TodoItem }  from '../components/todo/TodoItem';

const Todos = (props) => {

    const [loading, setLoading] = useState(false)
    const [activeLabel, setActiveLabel] = useState("public");

    const [todo, setTodo] = useState('');
    const [desc, setDesc] = useState('');
    const [duedate, setDuedate] = useState(moment().add(1,'day'));
    const [ispublic, setIspublic] = useState(true)

    const [todos, setTodos] = useState([]);

    const todolist = todos && todos.map(todo => (
        <TodoItem  key={todo.id} todo={todo} principal={props.principal} />
    ))

   
    useEffect(()=>{

        fetchTodos();
        
    },[])
    function fetchTodos(){
        if(props.principal){
            changeLabel("my")
        }else{
            changeLabel("public")
        }
    }
    function changeLabel(label){
        if(label == "public"){
            icevent.getTodos().then(todos=>{
                console.log(todos)
                setTodos(todos);

            })
        }else if(label == "my"){
            icevent.getMyTodos(props.principal).then(todos=>{
                console.log(todos)
                setTodos(todos);

            })
        }
    }
    function handleChange(e){
        if(e.target.name == "todo"){
            setTodo(e.target.value)
        }
    }


    function handleCheck (e, data) {
        console.log("checked? "+data.checked)
        if(data.name=='ispublic') setIspublic(data.checked)
    }

    function newTodo(){
        console.log("new todo"+todo)
        if(todo != ''){
        setLoading(true)
        if(todo != '' && props.principal){
            
            icevent.addTodo(todo, desc, props.principal, ispublic, duedate.unix()).then(()=> {
                fetchTodos();
                setLoading(false)
                
            });
            setTodo('')
        }
        }
    }


    return(
        <Container>
            <Dimmer active={loading} page><Loader inverted></Loader></Dimmer>
            {props.principal &&
            <>
                <Form onSubmit={newTodo}>
                    <Form.Group >
                        
                        
                        <Form.Field>
                            <Checkbox name="ispublic" checked={ispublic} onChange={handleCheck} label='is public?' />
                        </Form.Field>
                     </Form.Group>
                    
                    <Form.Field>
                        <input name="todo" value={todo} focus="true" placeholder='new todo (project, issue, proposal)...' onChange={handleChange}/>
                    </Form.Field>
                    
                </Form>
                <Divider/>
                </>
            }
            { props.principal &&
                <>           
                 <Label as="a" size="big" active={activeLabel == "public"} onClick={()=>changeLabel('public')}><Icon name="tag" /> Public </Label>
                <Label as="a" size="big"  active={activeLabel == "my"}  onClick={()=>changeLabel('my')}><Icon name="tag" /> My </Label>
                </>
            }

            {todolist}
            
            
        </Container>
    )
}

export default Todos;