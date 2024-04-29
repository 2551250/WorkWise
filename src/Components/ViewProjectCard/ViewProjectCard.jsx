import React from "react";

import "./ViewProjectCard.css";


const ViewProjectCard = ({ name, description, estimatedTime, members }) => {
    return (
        <article>
            <table className="table-wrapper">
                <tbody>
                    <tr>
                    <td className="project-name">{name}</td>
                    <td className="project-desc">{description}</td>
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
                </tr>
                </tbody>
            </table>
        </article>
    );
}

export default ViewProjectCard;
