import React from "react";

import "./ViewProjectCard.css";
import { useNavigate } from "react-router";

// Component to display the information projects from a manager's perspective
const ViewProjectCard = ({ name, description, estimatedTime, members, manager, managerID }) => {
        // Project Data
        const project = {
            PROJECT_NAME: name, 
            DESCRIPTION: description,
            ESTIMATED_TIME: estimatedTime,
            ASSIGNED_STAFF: members,
            MANAGER: manager,
            MANAGER_ID: managerID
        }
    
    const navigate = useNavigate();

    const setChatButton = () => {
        // Use navigate function to go to another page
        navigate('/ChatPage', {state: project});
    };

    return (
        <article>
            <table className="table-wrapper">
                <tbody>
                    <tr>
                    <td className="project-name">{name}</td>
                    <td className="project-desc">{description}</td>
                    <td className="project-est-time">{estimatedTime} Hrs</td>
                    <td className="project-members2">
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
                    <td className="buttons-display"> <button className="time-button" onClick={setChatButton}> Group Chat </button></td>
                </tr>
                </tbody>
            </table>
        </article>
    );
}

export default ViewProjectCard;
