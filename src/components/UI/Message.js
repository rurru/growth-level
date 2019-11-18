import React from 'react';

const Message = (props) => {

    const bgStyle = props.content.type == "error" ? 
        {backgroundColor: "#edd5d1"} : {backgroundColor: "#def0d8"}

    const xStyle = props.content.type == "error" ?
        {color: "#ad837b", borderColor: "#d4aca5"} : {color: "#7bab79", borderColor: "#7bab79"}

  return (
    <div id = "message" style = {bgStyle}>
        {props.content.content}
        <span id = "message-close" style = {xStyle} onClick = {props.clear}>
            x
        </span>    
    </div>);
}

export default Message;


