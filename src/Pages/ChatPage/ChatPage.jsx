import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import Header from "../../Components/Header/Header";
import MessageReceiveCard from "../../Components/MessageCard/MessageReceiveCard";
import MessageSendCard from "../../Components/MessageCard/MessageSendCard";

import { getEmployeeName, getProjectMessages, getAllEmployees } from "../../backend";

import "./ChatPage.css";
import { insertMessage } from "../../backend_post_requests";


const getTimeFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
}

const ChatPage = () => {
    //Variables
    const location = useLocation();
    const projectData = location.state;

    const { employeeID } = useEmployee();
    const senderID = parseInt(employeeID);

    const [employees, setEmployees] = useState([]);
    const [projectMessages, setProjectMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const messagedReceivers = [];

    // Functions & Logic
    if ( senderID === projectData.MANAGER_ID){
        projectData.ASSIGNED_STAFF.forEach((staff) => {
            messagedReceivers.push(staff.EMPLOYEE_ID);
        });
    }

    else if (employeeID !== projectData.MANAGER_ID){
        messagedReceivers.push(projectData.MANAGER_ID);

        projectData.ASSIGNED_STAFF.forEach((staff) => {
            if (staff.EMPLOYEE_ID !== parseInt(employeeID)){
                messagedReceivers.push(staff.EMPLOYEE_ID);
            }
        });
    }

    const fetchProjectMessages = async (projectID) => {
        const projectMessagesData = await getProjectMessages(projectID);
        if (typeof(projectMessagesData) != "string"){ //request was successful
            setProjectMessages(projectMessagesData);
        }
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await getAllEmployees();
            if (typeof(data) != "string"){ //request was successful
                setEmployees(data);
            }
        }

        fetchEmployees();
        fetchProjectMessages(projectData.PROJECT_ID);
    }, [projectData]);

    const handleSubmitButtonClick = async () => {
        console.log(newMessage);

        const today = new Date();
        const currentTime = today.toLocaleTimeString();
        const currentDate = today.toLocaleDateString();

        if (newMessage !== ""){
            for (const receiverID of messagedReceivers) {
                const response = await insertMessage(senderID, receiverID, newMessage, projectData.PROJECT_ID, currentTime, currentDate);
                console.log(response);
            }
        }

        await fetchProjectMessages(projectData.PROJECT_ID);
        setNewMessage("");
    }

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
                    projectMessages.map((message) => {
                        
                        if (message.MESSAGE_SENT_BY === senderID){
                            return (
                                <MessageSendCard key={message.MESSAGE_ID}
                                employeeName={getEmployeeName(message.MESSAGE_SENT_BY, employees)} 
                                message={message.MESSAGE_TEXT} timeSent={getTimeFromDate(message.TIME)}/>
                            )
                        }

                        else {
                            return (
                                <MessageReceiveCard key={message.MESSAGE_ID}
                                employeeName={getEmployeeName(message.MESSAGE_SENT_BY, employees)} 
                                message={message.MESSAGE_TEXT} timeSent={getTimeFromDate(message.TIME)}/>
                            )
                        }
                    })
                }
            </main>
            <section className = 'send-wrapper'>
                <textarea
                value={newMessage}
                className='send-message'
                maxLength={500} // Limit the text length to 30 characters
                rows={4} // Specify the number of visible rows
                cols={40} // Specify the number of visible columns
                onChange={(event) => (setNewMessage(event.target.value))} 
                />
                <button onClick={handleSubmitButtonClick}>Send</button>
            </section>
        </>
    );
}

export default ChatPage;