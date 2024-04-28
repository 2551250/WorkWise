import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import { insertReview } from "../../backend_post_requests";
import "./StaffFeedbackPage.css";


const ViewFeedback = () => {
    
    // HTML Code
    return (
   
     <section>
        <h2 className="feedbackTitle">Feedback for -Project-Name-</h2>
    <article className = "review">
        <p className = "review-name">John Doe</p>
        <p className = "message">Great Work on the project. Loved what you did with the colours. They are very vibrant</p>
    </article>

    </section>
 
    );
}


const AddFeedback = ({ projectReviewer, setviewFeedback}) => {
    
 // Variables
 const [projectReviewee, setprojectReviewee] = useState("");
 const [projectFeedback, setProjectFeedback] = useState([]);
 const [projectID, setProjectID] = useState([]);
 const [projectMembers, setProjectsMembers] = useState([]);

 // Functions & Logic
 const handleButtonClick = () => {
     /*
         When the submit button is clicked, inserts the feedback information
         into our database.
     */

     //TODO: Implement input validation

     //TODO: Find way to get members assigned to project
   

     // TODO: Find a way to get members from drop down  and project ID

     insertReview(projectReviewer, projectReviewee, projectFeedback, projectID );
     
     //TODO: Add project members to our database
     console.log(projectMembers);

     // Moves manager to View Projects section
     setviewFeedback(true);
 }

    // HTML Code
    return (
        <section className="display">
        <section className = "add-feedback">
            <h2 className="feedbackTitle">Feedback for #</h2>
            <article className= "addreview">
                <article className="member-select">
                <p>Select Member:</p>
                <select> 
                    <option value="member1">Member 1</option>
                    <option value="member2">Member 2</option>
                    <option value="member3">Member 3</option>
                    <option value="member3">Member 4</option>
                    
                </select>
                </article>
                <textarea 
                value = {projectFeedback}
                maxLength="200" 
                rows="5" 
                placeholder="Give Review"
                onChange={(event) => {setProjectFeedback(event.target.value)}} >    
            </textarea>
                <button className="feedback-button" onClick={handleButtonClick}>Give Feedback</button>
                
            </article>
        </section>
        </section>
    );
}


const StaffFeedbackPage = () => {
    // Variables
    const [viewFeedback, setviewFeedback] = useState(true);

    // Get the manager's Employee_ID
    const { employeeID } = useEmployee();
    const projectReviewer = employeeID;

    // Functions & Logic
    const viewFeedbackButtonClicked = () => {
        
        setviewFeedback(true);
    }

    const AddFeedbackButtonClicked = () => {
      
        setviewFeedback(false);
    }

    // HTML Code
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="logoutButton">Log Out</button>
            </Header> 

            <section className="display">
                <section className="panel">
                    <button className="panelButtons" onClick={viewFeedbackButtonClicked}> View Feedback</button>
                    <button className="panelButtons" onClick={AddFeedbackButtonClicked}>Add Feedback</button>
                </section>

                {/* 
                    Displays view projects section when viewFeedback is true,
                    else displays add a project secton. 
                */}
                {viewFeedback 
                 ? <ViewFeedback projectReviewer={projectReviewer}/> 
                 : <AddFeedback projectReviewer={projectReviewer} setviewFeedback={setviewFeedback}/>
                }
                
            </section>
        </>
    );
}
    
export default StaffFeedbackPage;