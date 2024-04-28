import React from "react";

//ATTENTION!!!
//Please check this css file  its either this or ./StaffFeedbackPage
import "./Pages/StaffFeedbackPages/StaffFeedbackPage.css";


const ViewFeedbackCard = ({ Reviewer, Review }) => {
    return (
        <section>
                <h2 className="feedbackTitle">Feedback for -Project-Name-</h2>
                <article className = "review">
                    <p className = "review-name">{Reviewer}</p>
                    <p className = "message">{Review}</p>
                </article>

        </section>
 
    );
}

export default ViewFeedbackCard;
