import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import ProjectPopUp from "../../Components/ProjectPopUp/ProjectPopUp";
import { getAllEmployees, getStaffProjects, getProjectAssignedStaff, findManagerName } from "../../backend";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./StaffProjectPage.css";

import messageIcon from "../../Assets/message-icon.svg";
import feedbackIcon from "../../Assets/feedback-icon.svg";
import stopwatchIcon from "../../Assets/stopwatch-icon.svg";
import manualtimeIcon from "../../Assets/clockface-icon.svg"
import { FaRegWindowClose } from "react-icons/fa";


const StaffProjectPage = ({ navigate }) => {
    // Variables
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array
    const [projectMembers, setProjectMembers] = useState([]);
    const [viewProjectPopUp, setViewProjectPopUp] = useState(false); 

    // Get the Staff's Employee_ID
    const { employeeID } = useEmployee();
    const StaffID = employeeID;


    // Functions & Logic
    useEffect(() => {
        // Gets all projects created by the manager
        async function getData() {
            await getStaffProjects(StaffID)
                .then((data) => {
                    if (typeof(data) !== "string"){
                        setProjects(data) // stores projects data in the projects list 
                    }
                })
                .catch((errorMessage) => {
                    console.error(errorMessage); // Display any errors
                });
            
            // Gets all employees stored in the database
            await getAllEmployees()
                .then((data) => {
                    setEmployeeData(data)
                })
                .catch((errorMessage) => {
                    console.error(errorMessage); // Display any errors
                });
        }
        getData();
    }, [StaffID]);

    // redirect to HomePage
    const homePageButton = () => {
       navigate("/Staff");
   }

    const handleViewProjectDetails = async ( project ) => {
        setViewProjectPopUp(true);

        const data = await getProjectAssignedStaff(project.PROJECT_ID);
        if (typeof(data) !== "string"){
            setProjectMembers(data);
        }

        const projectDetails = {
            PROJECT_ID: project.PROJECT_ID,
            PROJECT_NAME: project.PROJECT_NAME, 
            DESCRIPTION: project.DESCRIPTION,
            MANAGER: findManagerName(project.MANAGER_ID, employeeData),
            ESTIMATED_TIME: project.ESTIMATED_TIME,
            ASSIGNED_STAFF: projectMembers,
            MANAGER_ID: project.MANAGER_ID
        }

        setSelectedProject(projectDetails);
    }

    const setChatButton = () => {
    // Use navigate function to go to another page
        navigate('/ChatPage', {state: selectedProject});
    }

    const setFeedbackButton = () => {
        // Use navigate function to go to another page
        navigate('/StaffFeedbackPage', {state: selectedProject});
    };

    const setTimeButton = () => {
        // Use navigate function to go to another page
        navigate('/ChooseTime', {state: selectedProject});
    };

    // HTML Code
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
            </Header>

            <section className="view-project">
                <h2>Projects</h2>

                {/* Iterate through the projects list and display them */}
                {projects.map((project) => (
                    <ViewProjectCard 
                        key={project.PROJECT_ID}
                        project={project}
                        onView={handleViewProjectDetails}
                    />
                ))}
            </section>

            {/* Popup for displaying project details */}
            <ProjectPopUp trigger={viewProjectPopUp} setTrigger={setViewProjectPopUp}>
                <article className='popup-header'>
                    <h2>{selectedProject.PROJECT_NAME}</h2>
                    <FaRegWindowClose className="close-button" onClick={() => {setViewProjectPopUp(false)}}/>
                </article>
                
                <p>Details: {selectedProject.DESCRIPTION}</p>
                
                <p>Manager: {selectedProject.MANAGER}</p>

                <p className='popup-members'>Members:</p>
                <ul>
                    {
                        projectMembers.map((member) => (
                            <li key={member.EMPLOYEE_ID}> {`${member.NAME} ${member.SURNAME}`} </li>
                        ))
                    }
                </ul>
                <article className='button-wrapper'>
                    <button onClick={setChatButton}>
                        <img src={messageIcon} alt="Group Chat"/>
                    </button>

                    <button onClick={setFeedbackButton}> 
                        <img src = {feedbackIcon} alt = "Give Feedback" />
                    </button>
                    
                    <button onClick={setTimeButton}>
                        <img src = {stopwatchIcon} alt = " Stopwatch"/>
                    </button>
                    
                    <button onClick={setTimeButton}>
                        <img src = {manualtimeIcon} alt = "Manual Time"/>
                    </button>
                </article>
            </ProjectPopUp>
        </>

    );
}

export default StaffProjectPage;


