

import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Checkbox, Form, Button, Segment,Label, Modal,Header,Icon,Comment,TextArea,Loader,Dimmer} from 'semantic-ui-react'
import moment from 'moment';

import { icevent } from "../../api/icevent";
import CommentListItem  from './CommentListItem';

export default function Comments(props){
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        loadComments();
    },[])
    const commentList = comments.map(c=><CommentListItem comment={c}/>);

    function loadComments(){
        icevent.getComments(props.ctype, props.cid).then((comments)=>setComments(comments));
    }
   //scomment: Text, timestamp: Nat, user: Text, attachtype: Nat, attachid: Nat
   function addComment(){
    if(comment != ''){
        setLoading(true);
        
        icevent.addComment(comment,moment().unix(),props.principal,props.ctype,props.cid).then(()=>{
            setComment('');
            setLoading(false);
            // setOpenComment(false)
            loadComments();
        })
    }

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

    return (
        <>
         <Dimmer active={loading} page><Loader ></Loader></Dimmer>

          <Comment.Group>
            <Header as='h3' dividing>
            Comments
            </Header>
            {props.principal  &&
            <Form>

            <Form.Field
                control={TextArea}
                
                name="comment"
                value={comment} onChange={handleChange}
                />
           
           <Button onClick={addComment}>Add</Button>
         </Form>
        }
            {commentList.length>0 && commentList}
            {commentList.length == 0 && 
            <Segment placeholder>
            <Header icon>
              <Icon name='comment' />
              No comments
            </Header>
            
          </Segment>
            }
        </Comment.Group>
        </>
    
   
    )
}