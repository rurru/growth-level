import React from 'react';

const Message = (props) => {
  return (
    <div id = "message">
        {props.content.content}
        <span id = "message-close" onClick = {props.clear}>
            x
        </span>    
    </div>);
}

export default Message;