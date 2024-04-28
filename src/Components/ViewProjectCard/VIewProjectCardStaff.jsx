import React from "react";

import "./ViewProjectCard.css";
import { useNavigate } from 'react-router-dom';


const ViewProjectCardStaff = ({ name, description, manager, estimatedTime, members }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // Use navigate function to go to another page
        navigate('/StaffFeedbackPage');
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
