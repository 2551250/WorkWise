import React from "react";

//ATTENTION!!!
//Please check this css file  its either this or ./StaffFeedbackPage
import "./ViewFeedbackCard.css";

// Component to display all the feedback given from other staff members for a selected project
const ViewFeedbackCard = ({ Reviewer, Review }) => {
    return (
        <article className = "review-wrapper">
            <p className = "review-name">{Reviewer}</p>
            <p className = "message">{Review}</p>
        </article>
    );
}

export default ViewFeedbackCard;
