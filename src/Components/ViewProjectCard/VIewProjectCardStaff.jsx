import React from "react";

import "./ViewProjectCard.css";


const ViewProjectCardStaff = ({ projectID, name, description, manager, estimatedTime, members, navigate }) => {
    const handleClick = () => {

        // Project Data
        const project = {
            PROJECT_ID: projectID,
            PROJECT_NAME: name, 
            DESCRIPTION: description,
            MANAGER: manager,
            ESTIMATED_TIME: estimatedTime,
            ASSIGNED_STAFF: members
        }
        // Use navigate function to go to another page
        navigate('/StaffFeedbackPage', {state: project});
      };
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
                        <td className="feedback"> <button className="feedback-button" onClick={handleClick}> Feedback</button></td>
                    </tr>

                </tbody>

            </table>

        </article>
    );
}

export default ViewProjectCardStaff;
