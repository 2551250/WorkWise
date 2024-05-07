import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import Header from "../../Components/Header/Header";
import MessageReceiveCard from "../../Components/MessageCard/MessageReceiveCard";
import MessageSendCard from "../../Components/MessageCard/MessageSendCard";

import { getSentMessages, getReceivedMessages } from "../../backend";

import "./ChatPage.css";

function ChatPage(){
    //Variables
    const location = useLocation();
    const projectData = location.state;

    const { employeeID } = useEmployee();

    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);


    const messagedSender = [];

    // Functions & Logic
    if ( employeeID === projectData.MANAGER_ID){
        projectData.ASSIGNED_STAFF.forEach((staff) => {
            messagedSender.push(staff.EMPLOYEE_ID);
        });
    }

    else if (employeeID !== projectData.MANAGER_ID){
        messagedSender.push(projectData.MANAGER_ID);

        projectData.ASSIGNED_STAFF.forEach((staff) => {
            if (staff.EMPLOYEE_ID !== parseInt(employeeID)){
                messagedSender.push(staff.EMPLOYEE_ID);
            }
        });
    }

    useEffect(() => {
        const fetchSentMessages = async (employeeID) => {
            const data = await getSentMessages(employeeID);
            if (typeof(data) !== "string"){
                getSentMessages(data);
            }
        }

        const fetchReceivedMessages = async (messagedSender) => {
            const messages = [];
            for (const sender of messagedSender){
                const data = await getReceivedMessages(sender);
                if (typeof(data) !== "string"){
                    messages.push(data[0]);
                }
            }
            setReceivedMessages(messages);
        }

        fetchSentMessages(employeeID);
        fetchReceivedMessages(messagedSender);
    }, [employeeID, messagedSender]);

    console.log(sentMessages);
    console.log(receivedMessages);


    return(
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="logout-button">Log Out</button>
            </Header>

            <header>
            <h2 className='message-header'> {projectData.PROJECT_NAME} </h2>
            </header>

            <main className='message-display'>
                {
                    receivedMessages.map((message) => (
                        <MessageReceiveCard 
                        employeeName={message.MESSAGE_SENT_BY} 
                        message={message.MESSAGE_TEXT} 
                        timeSent={message.TIME}
                        />
                    ))
                }
                <MessageSendCard 
                    employeeName={"Person"} 
                    message={"Hey guys! so I thought about something really random for the project."} 
                    timeSent={"10:00"}
                />
                <MessageSendCard 
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