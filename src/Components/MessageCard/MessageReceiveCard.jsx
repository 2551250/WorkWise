import React from "react";

import "./MessageReceiveCard.css";


const MessageReceiveCard = ({employeeName, message, timeSent}) => {
    return (
        <section className='message-wrapper'>
            <article className='message-receive'>
                <p className='message-name-receive'>{employeeName}</p>
                <p className='message'>{message}</p>
                <p className='message-time'>{timeSent}</p>
            </article>
        </section>  
    );
}

export default MessageReceiveCard;
