import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";


import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import { getReceivedReviews, getAllEmployees, getEmployeeName, getReceivedReviewsProject} from "../../backend";
import { insertReview } from "../../backend_post_requests";

import "./StaffFeedbackPage.css";

import Header from "../../Components/Header/Header";
import ViewFeedbackCard from "../../Components/ViewProjectCard/VIewFeedbackCard";
import Dropdown from "../../Components/Dropdown/Dropdown";
import PopUp from "../../Components/PopUp/PopUp";


const ViewFeedback = ({ reviewerID, projectData }) => {
    /*
        Displays all feeback reviewed for a project

        :param1 reviewerID: The employee id of the staff member reviewing their feedback
        :param2 projectData: All data of the currently selected project
        :returns HTML code: code for the actual section
    */

    // Variable
    const [receivedFeedback, setReceivedFeedback] = useState([]);
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        // Gets all received feedback
        getReceivedReviews(reviewerID)
        .then((data) => {
            // Filters received feedback data to only contain
            const projectReceivedFeedback = getReceivedReviewsProject(projectData.PROJECT_ID, data);

            // Sets updates receivedFeedback
            setReceivedFeedback(projectReceivedFeedback);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });

        // Gets the data of all employees
        getAllEmployees()
        .then((data) => {
            // Sets updates employees
            setEmployees(data);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });

    }, [reviewerID, projectData.PROJECT_ID]);

    // HTML Code
    return (
   
     <section>
        <h2 className="feedbackTitle">Feedback for {projectData.PROJECT_NAME}</h2>

        {/* Iterate through the received feedback list and display them */}
        { receivedFeedback.length > 0
            ? receivedFeedback.map((feedback) => (
                <ViewFeedbackCard Reviewer={getEmployeeName(feedback.REVIEW_BY, employees)} Review={feedback.DESCRIPTION}/>
            ))
            : ""
        }

    </section>
 
    );
}


const AddFeedback = ({ reviewerID, projectData }) => {
    /*
        Displays all feeback reviewed for a project

        :param1 reviewerID: The employee id of the staff member reviewing their feedback
        :param2 projectData: All data of the currently selected project
        :returns HTML code: code for the actual section
    */
    
    // Variables
    const [revieweeID, setRevieweeID] = useState(null);
    const [reviewDescription, setReviewDescription] = useState("");
    const [error, setError] = useState(null);
    const [displayPopup, setDisplayPopup] = useState(false);

    // Functions & Logic
    const handleButtonClick = async () => {
        if (revieweeID === null){
            setError("No Reviewee Selected.");
            return;
        }

        else if (reviewDescription === ""){
            setError("No Description was Entered.");
            return;
        }

        // Add new Review to the Database
        const response = await insertReview(revieweeID, reviewerID, reviewDescription, projectData.PROJECT_ID)
        if (response === "Review successfully created"){
            setDisplayPopup(true);
        }
    }

    // Gets our possible revieews
    const reviewees = projectData.ASSIGNED_STAFF.filter((staff) => (staff.EMPLOYEE_ID !== reviewerID));
    
    // Puts data in a format that Dropdown component can accept
    const options = reviewees.map((employee) => ({
        value: employee.EMPLOYEE_ID,
        label: `${employee.NAME} ${employee.SURNAME}`,
    }));


    // HTML Code
    return (
        <>
            <section className="display">
                <section className = "add-feedback">
                    <h2 className="feedbackTitle">Feedback for {projectData.PROJECT_NAME}</h2>
                    <article className= "addreview">
                        <article className="member-select">
                        <p>Select Member:</p>
                        <Dropdown options={options} setTrigger={setRevieweeID}/>
                        </article>
                        <textarea  className="textarea-give-feedback"
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
            
            <PopUp trigger={displayPopup} setTrigger={setDisplayPopup}>
                <h3>Feedback Sent</h3>
            </PopUp>
        </>
    );
}


const StaffFeedbackPage = () => {
    // Variables
    const location = useLocation();
    const projectData = location.state;
    const navigate = useNavigate();

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
 

    // redirect to HomePage
    const homePageButton = () => {
        navigate("/Staff");
    }

    // HTML Code
    return (
        <>
        <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
            </Header>

            <section className="display">
                <section className="panel">
                    <button className="panelButtons" onClick={viewFeedbackButtonClicked}> View Feedback</button>
                    <button className="panelButtons" onClick={AddFeedbackButtonClicked}>Add Feedback</button>
                </section>

                {/* 
                    Displays view feedback section when viewFeedback is true,
                    else displays add feedback secton. 
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