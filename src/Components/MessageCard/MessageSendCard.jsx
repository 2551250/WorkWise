import React from "react";

import "./MessageSendCard.css";


const MessageSendCard = ({employeeName, message, timeSent}) => {
    return (
        <section className='message-wrapper'>
            <article className='message-sent'>
                <p className='message-name-sent'>{employeeName}</p>
                <p className='message'>{message}</p>
                <p className='message-time'>{timeSent}</p>
            </article>
        </section>  
    );
}

export default MessageSendCard;
