import React from "react";
import Header from "../../Components/Header/Header";
import MessageReceiveCard from "../../Components/MessageCard/MessageReceiveCard";
import MessageSendCard from "../../Components/MessageCard/MessageSendCard";

import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./ChatPage.css";

const ChatPage = () => {
    // Variables
    let { employeeID } = useEmployee();
    employeeID = parseInt(employeeID);

    //Functions & Logic

    // HTML Code
    return(
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="logout-button">Log Out</button>
            </Header>

            <header>
            <h2 className='message-header'> projectName </h2>
            </header>

            <main className='message-display'>
                <MessageReceiveCard 
                    employeeName={"Person"} 
                    message={"Hey guys! so I thought about something really random for the project."} 
                    timeSent={"10:00"}
                />
                <MessageReceiveCard 
                    employeeName={"Person"} 
                    message={"Hey guys! so I thought about something really random for the project."} 
                    timeSent={"10:00"}
                />
                <MessageReceiveCard 
                    employeeName={"Person"} 
                    message={"Hey guys! so I thought about something really random for the project."} 
                    timeSent={"10:00"}
                />
                <MessageSendCard 
                    employeeName={"Person"} 
                    message={"Hey guys! so I thought about something really random for the project."} 
                    timeSent={"10:00"}
                />
            </main>
            <section className = 'send-wrapper'>
                <textarea
                className='send-message'
                maxLength={500} // Limit the text length to 30 characters
                rows={4} // Specify the number of visible rows
                cols={40} // Specify the number of visible columns 
                />
                <button>Send</button>
            </section>
        </>
    );
}

export default ChatPage;