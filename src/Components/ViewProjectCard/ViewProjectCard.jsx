import React from "react";

import "./ViewProjectCard.css";
import expandIcon from "../../Assets/expand-icon.svg";

// Component to display the information projects from a manager's perspective
const ViewProjectCard = ({ project, onView}) => {

    return (
        <article>
            <table className="table-wrapper">
                <tbody>
                    <tr>
                    <td className="project-name">{project.PROJECT_NAME}</td>
                    <td className="project-expand">
                        <img src = {expandIcon} onClick={() => {onView(project)}} alt="project details"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </article>
    );
}

export default ViewProjectCard;
