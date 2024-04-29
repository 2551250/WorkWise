import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";


import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import { getReceivedReviews, getAllEmployees } from "../../backend";
import { insertReview } from "../../backend_post_requests";

import "./StaffFeedbackPage.css";

import Header from "../../Components/Header/Header";
import ViewFeedbackCard from "../../Components/ViewProjectCard/ViewFeedbackCard";
import Dropdown from "../../Components/Dropdown/Dropdown";


const getEmployeeName = (employeeID, employees) => {
    const filteredEmployees = employees.filter((employee) => employee.EMPLOYEE_ID === employeeID);
    const targetEmployee = filteredEmployees[0];

    return targetEmployee ? `${targetEmployee.NAME} ${targetEmployee.SURNAME}` : "No Employee Found";
}


const ViewFeedback = ({ reviewerID, projectData }) => {
    // Variable
    const [receivedFeedback, setReceivedFeedback] = useState([]);
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        getReceivedReviews(reviewerID)
        .then((data) => {
            const projectReceivedFeedback = data.filter((feedback) => (feedback.PROJECT_ID === projectData.PROJECT_ID));
            setReceivedFeedback(projectReceivedFeedback);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });

        getAllEmployees()
        .then((data) => {
            setEmployees(data);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });

    }, [reviewerID]);

    // HTML Code
    return (
   
     <section>
        <h2 className="feedbackTitle">Feedback for {projectData.PROJECT_NAME}</h2>

        {
        receivedFeedback.map((feedback) => (
            <ViewFeedbackCard Reviewer={getEmployeeName(feedback.REVIEW_BY, employees)} Review={feedback.DESCRIPTION}/>
        ))
        }

    </section>
 
    );
}


const AddFeedback = ({ reviewerID, projectData }) => {
    
    // Variables
    const [revieweeID, setRevieweeID] = useState(null);
    const [reviewDescription, setReviewDescription] = useState("");
    const [error, setError] = useState(null);

    // Functions & Logic
    const handleButtonClick = () => {
        if (revieweeID === null){
            setError("No Reviewee Selected.");
            return;
        }

        else if (reviewDescription === ""){
            setError("No Description was Entered.");
            return;
        }

        // Add new Review to the Database
        insertReview(revieweeID, reviewerID, reviewDescription, projectData.PROJECT_ID)
        .then(() => {
            console.log("Review Added!!!");
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }

    const reviewees = projectData.ASSIGNED_STAFF.filter((staff) => (staff.EMPLOYEE_ID !== reviewerID));
    const options = reviewees.map((employee) => ({
        value: employee.EMPLOYEE_ID,
        label: `${employee.NAME} ${employee.SURNAME}`,
    }));


    // HTML Code
    return (
        <section className="display">
        <section className = "add-feedback">
            <h2 className="feedbackTitle">Feedback for {projectData.PROJECT_NAME}</h2>
            <article className= "addreview">
                <article className="member-select">
                <p>Select Member:</p>
                <Dropdown options={options} setTrigger={setRevieweeID}/>
                </article>
                <textarea  
                    value={reviewDescription} 
                    maxLength = "200" 
                    rows="5" 
                    placeholder="Enter feedback" 
                    onChange={(event) => (setReviewDescription(event.target.value))}>    
                </textarea>

                {error && <label className="error-label"> {error} </label>} 
                <button className="feedback-button" onClick={handleButtonClick}>Give Feedback</button>
                
            </article>
        </section>
        </section>
    );
}


const StaffFeedbackPage = () => {
    // Variables
    const location = useLocation();
    const projectData = location.state;

    const [viewFeedback, setviewFeedback] = useState(true);

    // Get the manager's Employee_ID
    const { employeeID } = useEmployee();
    const reviewerID = parseInt(employeeID);

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
                 ? <ViewFeedback reviewerID={reviewerID} projectData={projectData}/> 
                 : <AddFeedback reviewerID={reviewerID} projectData={projectData} setviewFeedback={setviewFeedback}/>
                }
                
            </section>
        </>
    );
}
    
export default StaffFeedbackPage;