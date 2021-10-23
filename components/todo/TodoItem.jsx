
import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Checkbox, Form, Button, Segment,Item,Image, Modal,Header,Icon,Comment,TextArea,Loader,Dimmer} from 'semantic-ui-react'
import moment from 'moment';
import { icevent } from "../../../declarations/icevent";
import { TodoView } from "./TodoView";
import CommentListItem from '../comment/CommentListItem';
import Comments from '../comment/Comments';

function TodoItem(props){

    const [loading, setLoading] = useState(false)
    const [theTodo, setThetodo] = useState(props.todo);


    const [todo, setTodo] = useState(props.todo ? props.todo.todo : '');
    const [description, setDescription] = useState(props.todo ? props.todo.description : '');
    const [duedate, setDuedate] = useState(props.todo ? moment.unix(parseInt(props.todo.duedate)).format("YYYY-MM-DD") : moment().add(1,'day'));
    const [ispublic, setIspublic] = useState(props.todo ? props.todo.ispublic : false)
    const [checked, setChecked] = useState(props.todo.status == 9);

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    
    const [openTodo, setOpenTodo] = useState(false)
    const [openComment, setOpenComment] = useState(false)

    useEffect(()=>{
        loadComments();
    },[])

    const commentList = comments.map(c=><CommentListItem comment={c}/>);

    function loadComments(){
        icevent.getComments(3, theTodo.id).then((comments)=>setComments(comments));
    }
    function handleChange(e){
        if(e.target.name == "todo"){
            setTodo(e.target.value)
        }else if(e.target.name == "description"){
            setDescription(e.target.value);
        }else if(e.target.name == "duedate"){
            setDuedate(e.target.value)
        }else if(e.target.name == "comment"){
            setComment(e.target.value);
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

    //scomment: Text, timestamp: Nat, user: Text, attachtype: Nat, attachid: Nat
    function addComment(){
        if(comment != ''){
            setLoading(true);
            
            icevent.addComment(comment,moment().unix(),props.principal,3,theTodo.id).then(()=>{
                setComment('');
                setLoading(false);
                // setOpenComment(false)
                loadComments();
            })
        }

    }


    return(
        <Segment>

            <Item.Group>
                    <Item>
                    <Item.Image size='tiny'>{!props.principal && <Checkbox checked={checked} disabled={checked} />} 
                         {props.principal && props.principal == theTodo.owner && <Checkbox name="checked" checked={checked} disabled={checked}  onChange={handleCheck} />}</Item.Image>

                    <Item.Content>
                        <Item.Header as='a'>{theTodo.todo}</Item.Header>
                        <Item.Meta>due on {moment.unix(parseInt(theTodo.duedate)).format("YYYY-MM-DD")}</Item.Meta>
                        <Item.Description>
                        {theTodo.description}
                        </Item.Description>
                        <Item.Extra>
                        { !checked && props.principal == theTodo.owner  && <Button onClick={()=>setOpenTodo(true)} icon floated="right"><Icon name="pencil"/></Button>}
                        { !checked && props.principal == theTodo.owner  && <Button onClick={} icon floated="right"><Icon name="tasks"/></Button>}
                        { <Button onClick={()=>setOpenComment(true)} icon floated="right"><Icon name="comments"/></Button>}
                        </Item.Extra>
                    </Item.Content>
                    </Item>

                    
                </Item.Group>
            
            
            <Modal
                
                open={openTodo}
                
                onClose={() => setOpenTodo(false)}
                onOpen={() => setOpenTodo(true)}
                >
                <Header icon='tasks' content={theTodo? theTodo.todo : 'add sub-todo'} />
                <Modal.Content>
                    <Dimmer active={loading} page><Loader inverted></Loader></Dimmer>
                    {props.principal != theTodo.owner && <TodoView todo={props.todo} principal={props.principal}/>}
                    {props.principal == theTodo.owner &&
                        <Form>

  
                        <Form.Field>
                            <input name="todo" value={todo} focus="true" placeholder='new todo ...' onChange={handleChange}/>
                        </Form.Field>
                        <Form.Field
                            control={TextArea}
                            label='Description'
                            name="description"
                            value={description} onChange={handleChange}
                            />
                        <Form.Group>
                          <Form.Field inline>
                              <label> Due date</label>
                              <input name="duedate" type="date" value={duedate} onChange={handleChange}/>      
                         </Form.Field> 

                        
                        <Form.Field>
                             
                                <Checkbox name="ispublic" checked={ispublic} onChange={handleCheck} label='is public?' />
                        </Form.Field>
                        </Form.Group>                  
                     </Form>
                    }
                </Modal.Content>
                <Modal.Actions>
                    {theTodo && theTodo.owner == props.principal && <Button onClick={changeTodo}>Save</Button>}
                    <Button  onClick={() => setOpenTodo(false)}>
                    <Icon name='remove' /> close
                    </Button>
                    
                </Modal.Actions>
                </Modal>

                    
                <Modal //comment
                
                open={openComment}
                
                onClose={() => setOpenComment(false)}
                onOpen={() => setOpenComment(true)}
                >
               
                <Modal.Content>
                   
                    
                    <Comments principal={props.principal} ctype={3} cid={theTodo.id}/>
                    
                </Modal.Content>

                </Modal>
                
        </Segment>
    )
}

export {TodoItem}