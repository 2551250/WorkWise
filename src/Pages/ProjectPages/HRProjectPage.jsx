import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import ProjectPopUp from "../../Components/ProjectPopUp/ProjectPopUp";
import { getAllEmployees, getProjectAssignedStaff, findManagerName, getAllProjects } from "../../backend";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./HRProjectPage.css";

import timesheetIcon from "../../Assets/timesheet-icon.svg";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router";


const HRProjectPage = () => {
    // Variables
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array
    const [projectMembers, setProjectMembers] = useState([]);
    const [viewProjectPopUp, setViewProjectPopUp] = useState(false); 
    const navigate = useNavigate();
    // Get the Staff's Employee_ID
    const { employeeID } = useEmployee();
    const StaffID = employeeID;


    // Functions & Logic
    useEffect(() => {
        // Gets all projects created by the manager
        async function getData() {
            await getAllProjects()
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
       navigate("/HR");
   }
   //Displaying project popup with respective details
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
    //Log out user  and change display to login page
    const logoutClicked = () =>{
        navigate("/");
    }
    //Redirect to the timesheet page for HR
    const viewTimesheetButton = () => {
        navigate("/Timesheet", {state: selectedProject});
    }

    // HTML Code
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button" onClick={logoutClicked}>Log Out</button>
            </Header>

            <section className="view-project">
                <h2 className="view-project-h2">Projects</h2>

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
                <article className='projectpopup-header'>
                    <h2>{selectedProject.PROJECT_NAME}</h2>
                    <FaRegWindowClose className="projectpopup-close-button" onClick={() => {setViewProjectPopUp(false)}}/>
                </article>
                
                <p>Details: {selectedProject.DESCRIPTION}</p>
                
                <p>Manager: {selectedProject.MANAGER}</p>

                <p className='projectpopup-members'>Members:</p>
                <ul>
                    {
                        projectMembers.map((member) => (
                            <li key={member.EMPLOYEE_ID}> {`${member.NAME} ${member.SURNAME}`} </li>
                        ))
                    }
                </ul>
                <article className='projectpopup-button-wrapper'>
                    <button onClick={viewTimesheetButton}>
                        <img className="projectpopup-img" src={timesheetIcon} alt="Project Timesheets"/>
                        <span className="projectpopup-label">Project Timesheets</span>
                    </button>
                </article>
            </ProjectPopUp>
        </>
    );
}

export default HRProjectPage;


