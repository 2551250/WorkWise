import React from "react";

import "./ViewProjectCard.css";

// Component to display the information projects from a staff's perspective
const ViewProjectCardStaff = ({ projectID, name, description, manager, estimatedTime, members, navigate, managerID }) => {
    
    // Project Data
    const project = {
        PROJECT_ID: projectID,
        PROJECT_NAME: name, 
        DESCRIPTION: description,
        MANAGER: manager,
        ESTIMATED_TIME: estimatedTime,
        ASSIGNED_STAFF: members,
        MANAGER_ID: managerID
    }
    
    const feedbackButton = () => {
        // Use navigate function to go to another page
        navigate('/StaffFeedbackPage', {state: project});
    };

    const setTimeButton = () => {
        // Use navigate function to go to another page
        navigate('/ChooseTime', {state: project});
    };

    const setChatButton = () => {
        // Use navigate function to go to another page
        navigate('/ChatPage', {state: project});
    }
      
    return (
        <article>
            <table className="table-wrapper">

                <tbody>
                    <tr>
                        <td className="project-name">{name}</td>
                        <td className="project-desc">{description}</td>
                        <td className="project-manager">{manager}</td>
                        <td className="project-est-time">{estimatedTime} Hrs</td>
                        <td className="project-members">
                            <ul>
                                {
                                    members !== "Error"
                                    ? members.map((member) => (
                                        <li key={member.EMPLOYEE_ID}> {`${member.NAME} ${member.SURNAME}`} </li>
                                    ))
                                    : ""
                                }
                            </ul>
                        </td>
                        <td className="buttons-display"> 
                            <button className="feedback-button" onClick={feedbackButton}> Feedback</button>
                            <button className="time-button" onClick={setTimeButton}> Add Time</button>
                            <button className="chat-button" onClick={setChatButton}> Group Chat </button>
                        </td>
                    </tr>
                </tbody>

            </table>

        </article>
    );
}

export default ViewProjectCardStaff;
