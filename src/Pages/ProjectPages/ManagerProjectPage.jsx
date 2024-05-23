import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import { getAllEmployees, getAllProjects, getManagerProjects, getProjectAssignedStaff, getProjectID, isValidProjectMembers, isValidProjectName, isValidProjectDescription, isValidProjectEstimateTime, findManagerName, getRoleFromID } from "../../backend";
import { insertProject, assignStaffToProject } from "../../backend_post_requests";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import EmployeeSelector from "../../Components/EmployeeSelector/EmployeeSelector";
import ProjectPopUp from "../../Components/ProjectPopUp/ProjectPopUp";

import "./ManagerProjectPage.css";
import { useNavigate } from "react-router";

import messageIcon from "../../Assets/message-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";
import { FaRegWindowClose } from "react-icons/fa";

// Component for displaying the view projects section
const ViewProjectsSection = ({ managerID, navigate }) => {
    /*
        Displays the view projects section

        :param managerID: The employee id of the manager creating a project
        :returns HTML code: code for the actual section
    */
    // State variables
    const [selectedProject, setSelectedProject] = useState({});
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]); // List of projects initialized to an empty array
    const [projectMembers, setProjectMembers] = useState([]);
    const [viewProjectPopUp, setViewProjectPopUp] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        // Fetch projects created by the manager
        const fetchProjectData = async () => {
            const managerProjectsData = await getManagerProjects(managerID);
            if (typeof(managerProjectsData) !== "string") {
                setProjects(managerProjectsData); // Store projects data in the projects list
            }
        };
        // Fetch employees
        const fetchEmployeesData = async () => {
            const data = await getAllEmployees();
            if (typeof(data) !== "string") {
                setEmployees(data); // Store employees data in the employees list
            }
        };
        // Fetching projects created by a specific manager
        fetchProjectData(managerID);
        fetchEmployeesData();
    }, [managerID]);

    // Display project popup and project details
    const handleViewProjectDetails = async (project) => {
        setViewProjectPopUp(true);

        const projectDetails = {
            PROJECT_ID: project.PROJECT_ID,
            PROJECT_NAME: project.PROJECT_NAME,
            DESCRIPTION: project.DESCRIPTION,
            ESTIMATED_TIME: project.ESTIMATED_TIME,
            ASSIGNED_STAFF: [],
            MANAGER_ID: managerID,
            MANAGER: findManagerName(managerID, employees),
            USER_ROLE: getRoleFromID(project.MANAGER_ID, employees)
        };

         // Gets all employees assigned to the project
        const data = await getProjectAssignedStaff(project.PROJECT_ID);
        if (typeof(data) !== "string") {
            projectDetails.ASSIGNED_STAFF = data;
            setProjectMembers(data); // Set project members data
        }

        setSelectedProject(projectDetails); // Set the selected project details
    };

    // Navigate to chat page
    const setChatButton = () => {
        navigate('/ChatPage', { state: selectedProject });
    };
    
    // Navigate to timesheet page
    const setTimesheetButton = () => {
        navigate('/Timesheet', { state: selectedProject });
    };

    // Render the component
    return (
        <section className="view-project">
            <h2 className="view-project-h2">Projects</h2>
            
            {/* Iterate through the projects list and display them */}
            {projects.length > 0 ? projects.map((project) => (
                <ViewProjectCard 
                    key={project.PROJECT_ID}
                    project={project}
                    onView={handleViewProjectDetails}
                />
            )) : " "}

            {/* Popup for displaying project details */}
            <ProjectPopUp trigger={viewProjectPopUp} setTrigger={setViewProjectPopUp}>
                <article className='projectpopup-header'>
                    <h2>{selectedProject.PROJECT_NAME}</h2>
                    <FaRegWindowClose className="projectpopup-close-button" onClick={() => {setViewProjectPopUp(false)}}/>
                </article>

                <p>Details: {selectedProject.DESCRIPTION}</p>

                <p className='projectpopup-members'>Members:</p>
                <ul>
                    {
                        projectMembers.map((member) => (
                            <li key={member.EMPLOYEE_ID}> {`${member.NAME} ${member.SURNAME}`} </li>
                        ))
                    }
                </ul>
                <article className='projectpopup-button-wrapper'>
                    <button onClick={setChatButton}>
                        <img className="projectpopup-img" src={messageIcon} alt="Group Chat"/>
                        <span className="projectpopup-label">Group Chat</span>
                    </button>

                    <button onClick={setTimesheetButton}>
                        <img className="projectpopup-img" src={timesheetIcon} alt="Project Timesheets"/>
                        <span className="projectpopup-label">Project Timesheets</span>
                    </button>
                </article>
            </ProjectPopUp>
        </section>
    );
}

// Component for adding staff to a project
const AddStaffSection = ({ projectName, managerID, setActiveSection }) => {
    /*
        Displays the add staff section

        :param projectName: used to store the name of a project
        :param managerID: The employee id of the manager creating a project
        :param setActiveSection: Function to set the value of activeSection to the currently active section
        :returns HTML code: code for the actual section
    */

    // State variables
    const [staff, setStaff] = useState([]);
    const [projects, setProjects] = useState([]);    
    const [projectMembers, setProjectsMembers] = useState([]);
    const [error, setError] = useState("");

    // Fetch all employees
    useEffect(() => {
        getAllEmployees()
        .then((data) => {
            setStaff(data.filter((employee) => (employee.ROLE === "Staff"))); // Filter and set staff data
        })
    },[]); 

    // Fetch projects created by the manager
    useEffect(() => {
        getManagerProjects(managerID)
        .then((projectsData) => (setProjects(projectsData))) // Set projects data
        .catch((errorMessage) => {
            console.error(errorMessage); // Display any errors
        });
    }, [managerID]);

    // Handle add members button click
    const handleButtonClick = async () => {
        if (!isValidProjectMembers(projectMembers)) {
            setError("No Staff was assigned to a Project."); // Set error message if no staff assigned
            return;
        }

        const projectID = getProjectID(projectName, projects);

        for (const staffID of projectMembers){
            await assignStaffToProject(staffID, projectID); // Assign staff to the project
        }

        // Move manager to View Projects section
        setActiveSection("viewProjectSection");
    }

    // Render the component
    return (
        <section className="select-wrapper">  
            <section className="select-container"> 
                <EmployeeSelector 
                    groupName="Staff" 
                    data={staff || []} 
                    setTrigger={setProjectsMembers}
                />

                {/* Displays Invalid Data Error Message */}
                {error && <label className="add-members-error-label"> {error} </label>}
                <button className="add-members" onClick={handleButtonClick}> Add Members</button>
            </section>
        </section>
    );
}

// Component for adding a new project
const AddProjectsSection = ({ projectName, setProjectName, managerID, setActiveSection }) => {
    /*
        Displays the add a project section

        :param projectName: used to store the name of a project
        :param setProjectName: Function to set projectName variable to a project's name
        :param managerID: The employee id of the manager creating a project
        :param setActiveSection: Function to set the value of activeSection to the currently active section
        :returns HTML code: code for the actual section
    */

    // State variables
    const [projects, setProjects] = useState([]);
    const [projectDescription, setProjectDescription] = useState("");
    const [projectEstimatedTime, setProjectEstimatedTime] = useState(0);
    const [error, setError] = useState("");

    // Fetch all projects from the database
    useEffect(() => {
        const fetchData = async () => {
            const allProjectData = await getAllProjects();
            setProjects(allProjectData); // Set all projects data
        }

        fetchData();
    }, []);

    // Handle add project button click
    const handleButtonClick = async () => {
        /*
            When the submit button is clicked, inserts the project information
            into our database.
        */

        // Data Validation
        if (!isValidProjectName(projectName, projects || [])) {
            setError("Invalid Project Name"); // Set error if project name is invalid
            return;
        }

        else if (!isValidProjectDescription(projectDescription)) {
            setError("No Project Description Entered"); // Set error if project description is invalid
            return;
        }

        else if (!isValidProjectEstimateTime(projectEstimatedTime)) {
            setError("Invalid Project Estimate Time"); // Set error if project estimate time is invalid
            return;
        }

        // Adds project to our database
        const response = await insertProject(projectName, projectDescription, managerID, projectEstimatedTime);

        // TODO: Handle when a project isn't created
        if (response !== "Project successfully created") {
            alert("Project was not Created!!!"); // Alert if project creation fails
            return;
        }

        // Move manager to Add Staff section
        setActiveSection("addStaffSection");
    }

    // Render the component
    return (
        <section className="add-project">
            <h2 className="add-project-h2">Add a Project</h2>
            <section className="add-project-wrapper">
                <article className="formatting">
                    <p className="labels">Name</p>
                    <input
                        value={projectName} 
                        className="input-name" 
                        type="text" 
                        placeholder="Enter a project name"
                        onChange={(event) => {setProjectName(event.target.value)}}
                    />
                </article>
            
                <article className="formatting">
                    <p className="labels">Description</p>
                    <textarea className="textarea-add-project"
                        value={projectDescription}
                        maxLength="200" 
                        rows="5" 
                        placeholder="Enter a description"
                        onChange={(event) => {setProjectDescription(event.target.value)}}
                    >    
                    </textarea>
                </article>

                <article className="formatting">
                    <p className="labels">Estimated Time</p>
                    <input 
                        value={projectEstimatedTime}
                        className="input-time" 
                        type="number"
                        onChange={(event) => {setProjectEstimatedTime(event.target.value)}}
                    /> 
                    <p className="hours">Hours</p>
                </article>
            </section>

            {/* Displays Invalid Data Error Message */}
            {error && <label className="error-label"> {error} </label>} 
            <button className="create-project" onClick={handleButtonClick}> Add project</button>
        </section>
    );
}

// Main component for the Manager Project Page
const ManagerProjectPage = () => {
    // State variables
    const [projectName, setProjectName] = useState("");
    const [activeSection, setActiveSection] = useState("viewProjectSection");
    const navigate = useNavigate();

    // Get the manager's Employee_ID
    const { employeeID } = useEmployee();
    const managerID = employeeID;

    // Functions to handle button clicks
    const ViewProjectsButtonClicked = () => {
        /*
            Sets activeSection to viewProjectSection when the View Projects button is clicked
        */
        setProjectName("");
        setActiveSection("viewProjectSection");
    }

    const AddProjectButtonClicked = () => {
        /*
            Sets activeSection to addProjectSection when the Add a Project button is clicked
        */
        setProjectName("");
        setActiveSection("addProjectSection");
    }

    // Redirect to HomePage
    const homePageButton = () => {
        navigate("/Manager");
    }
    
    // Logout and navigate to login page
    const logoutClicked = () => {
        navigate("/");
    }

    // Render the main component
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button" onClick={homePageButton}>Homepage</button>
                <button className="logout-button" onClick={logoutClicked}>Log Out</button>
            </Header>

            <section className="display">
                <section className="panel">
                    <button className="panelButtons" onClick={ViewProjectsButtonClicked}> View Projects</button>
                    <button className="panelButtons" onClick={AddProjectButtonClicked}>Add a Project</button>
                </section>

                {/* 
                    Displays view projects section when activeSection is 'viewProjectSection',   
                    else displays add a project section. 
                */}
                {activeSection === "viewProjectSection" && <ViewProjectsSection managerID={managerID} navigate={navigate}/> }
                {activeSection === "addProjectSection" && <AddProjectsSection projectName={projectName} setProjectName={setProjectName} managerID={managerID} setActiveSection={setActiveSection}/>}
                {activeSection === "addStaffSection" && <AddStaffSection projectName={projectName} managerID={managerID} setActiveSection={setActiveSection} />}
            </section>
        </>
    );
}

export default ManagerProjectPage;
