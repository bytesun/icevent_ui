

import React, { useState,useEffect } from 'react';
import { render } from "react-dom";

import { Checkbox, Form, Button, Segment,Label, Modal,Header,Icon,Comment,TextArea,Loader,Dimmer} from 'semantic-ui-react'
import moment from 'moment';

export default function CommentListItem(props){

   
    return (

        <Comment>
          <Comment.Avatar src='https://pic.onlinewebfonts.com/svg/img_561543.png' />
          <Comment.Content>
            <Comment.Author as='a'>{props.comment.user.substring(0,10) + "..."}</Comment.Author>
            <Comment.Metadata>
              <div>{moment.unix(parseInt(props.comment.timestamp)).format("MMMM Do YYYY, h:mm")}</div>
            </Comment.Metadata>
            <Comment.Text>{props.comment.comment}</Comment.Text>
           
          </Comment.Content>
        </Comment>
    
    
   
    )
}