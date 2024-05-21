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

// Main component for HR Project Page
const HRProjectPage = () => {
    // State variables
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [projects, setProjects] = useState([]); // List of projects initialized to an empty array
    const [projectMembers, setProjectMembers] = useState([]);
    const [viewProjectPopUp, setViewProjectPopUp] = useState(false); 
    const navigate = useNavigate();

    // Get the staff's Employee_ID from context
    const { employeeID } = useEmployee();
    const StaffID = employeeID;

    // Fetch data on component mount
    useEffect(() => {
        // Fetches all projects created by the manager and all employees
        async function getData() {
            await getAllProjects()
                .then((data) => {
                    if (typeof(data) !== "string"){
                        setProjects(data); // Stores projects data in the projects list 
                    }
                })
                .catch((errorMessage) => {
                    console.error(errorMessage); // Display any errors
                });
            
            await getAllEmployees()
                .then((data) => {
                    setEmployeeData(data); // Stores employees data in the employeeData list
                })
                .catch((errorMessage) => {
                    console.error(errorMessage); // Display any errors
                });
        }
        getData();
    }, [StaffID]); // Dependency array includes StaffID to re-fetch data if it changes

    // Redirect to HomePage
    const homePageButton = () => {
        navigate("/HR");
    };

    // Display project popup with respective details
    const handleViewProjectDetails = async (project) => {
        setViewProjectPopUp(true);

        const data = await getProjectAssignedStaff(project.PROJECT_ID);
        if (typeof(data) !== "string"){
            setProjectMembers(data); // Sets the project members data
        }

        // Construct project details object
        const projectDetails = {
            PROJECT_ID: project.PROJECT_ID,
            PROJECT_NAME: project.PROJECT_NAME, 
            DESCRIPTION: project.DESCRIPTION,
            MANAGER: findManagerName(project.MANAGER_ID, employeeData),
            ESTIMATED_TIME: project.ESTIMATED_TIME,
            ASSIGNED_STAFF: projectMembers,
            MANAGER_ID: project.MANAGER_ID
        };

        setSelectedProject(projectDetails); // Sets the selected project details
    };

    // Log out user and redirect to login page
    const logoutClicked = () => {
        navigate("/");
    };

    // Redirect to the timesheet page for HR
    const viewTimesheetButton = () => {
        navigate("/Timesheet", {state: selectedProject});
    };

    // Render the component
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button" onClick={homePageButton}>Homepage</button>
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
                    {projectMembers.map((member) => (
                        <li key={member.EMPLOYEE_ID}>{`${member.NAME} ${member.SURNAME}`}</li>
                    ))}
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
