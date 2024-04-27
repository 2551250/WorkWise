import React from "react";

import "./ViewProjectCard.css";


const ViewProjectCardStaff = ({ name, description, manager, estimatedTime, members }) => {
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
                                {members.map((member) => (
                                    <li key={member}> {member} </li>
                                )
                                )}
                            </ul>
                        </td>
                        <td className="feedback"> <button className="feedback-button"> Give feedback</button></td>
                    </tr>

                </tbody>

            </table>

        </article>
    );
}

export default ViewProjectCardStaff;
