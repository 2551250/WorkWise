import React from "react";

//ATTENTION!!!
//Please check this css file  its either this or ./StaffFeedbackPage
import "./ViewFeedbackCard.css";


const ViewFeedbackCard = ({ Reviewer, Review }) => {
    return (
        <article className = "review">
            <p className = "review-name">{Reviewer}</p>
            <p className = "message">{Review}</p>
        </article>
    );
}

export default ViewFeedbackCard;
