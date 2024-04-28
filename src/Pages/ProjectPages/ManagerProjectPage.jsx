import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import { getAllEmployees, getManagerProjects, getProjectAssignedStaff} from "../../backend";
import { insertProject, assignStaffToProject } from "../../backend_post_requests";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import EmployeeSelector from "../../Components/EmployeeSelector/EmployeeSelector";

import "./ManagerProjectPage.css";


const ViewProjectsSection = ({ managerID }) => {
    /*
        Displays the view projects section

        :param1 managerID: The employee id of the manager creating a project
        :returns HTML code: code for the actual section
    */
    // Variables
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array
    const [assignedMembers, setAssignedMembers] = useState({});

    // Functions & Logic
    const fetchProjectMembers = async () => {
        // Iterate through each project and fetch project members
        const staffProjectObj = {};

        for (const project of projects) {
            const assignedStaff = await getProjectAssignedStaff(project.PROJECT_ID);
            staffProjectObj[project.PROJECT_ID] = assignedStaff;
        }
        setAssignedMembers(staffProjectObj);
    }
    
    useEffect(() => {
        // Gets all projects created by the manager
        getManagerProjects(managerID)
        .then((projectsData) => {
            setProjects(projectsData);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, [managerID]);


    useEffect(() => {
        fetchProjectMembers();
    }, [projects, fetchProjectMembers]);

    // HTML Code
    return (
        <section className="view-project">
            <h2>View Projects</h2>

            {/* Iterate through the projects list and display them */}
            {projects.map((project) => (
                <ViewProjectCard 
                    key={project.PROJECT_ID} projectID={project.PROJECT_ID} 
                    name={project.PROJECT_NAME} description={project.DESCRIPTION} 
                    estimatedTime={project.ESTIMATED_TIME} members={assignedMembers[project.PROJECT_ID] || []}
                />
            )
            )}
        </section>
    );
}


const getProjectID = (projectName, projectData) => {
    const filteredProjectData = projectData.filter((project) => (project.PROJECT_NAME === projectName));
    const targetProject = filteredProjectData[0];
    return targetProject.PROJECT_ID;
}


const AddStaffSection = ({projectName, managerID, setActiveSection}) => {
    
    const [staff, setStaff] = useState([]);
    const [projects, setProjects] = useState([]);    
    const [projectMembers, setProjectsMembers] = useState([]);

    useEffect(() => {
        getAllEmployees()
        .then((data) => {
            setStaff(data.filter((employee) => (employee.ROLE === "Staff")));
        })

    });

    useEffect(() => {
        // Gets all projects created by the manager
        getManagerProjects(managerID)
        .then((projectsData) => (setProjects(projectsData)))
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, [managerID]);

    

    const handleButtonClick = async () => {
        const projectID = getProjectID(projectName, projects);

        for (const staffID of projectMembers){
            await assignStaffToProject(staffID, projectID);
        }

        // Moves manager to View Projects section
        setActiveSection("viewProjectSection");
    }

    return (
        <section>   
            <EmployeeSelector 
                groupName="Staff" 
                data={staff || []} 
                setTrigger={setProjectsMembers}
            />

            <button className="create-project" onClick={handleButtonClick}> Add Members</button>
        </section>
    );
}


const AddProjectsSection = ({ projectName, setProjectName, managerID, setActiveSection}) => {
    /*
        Displays the add a project section

        :param1 managerID: The employee id of the manager creating a project
        :param2 setViewProjects: Function to set the value of viewProject to false/true
        :returns HTML code: code for the actual section
    */

    // Variables
    const [projectDescription, setProjectDescription] = useState("");
    const [projectEstimatedTime, setProjectEstimatedTime] = useState(0);


    // Functions & Logic
    const handleButtonClick = () => {
        /*
            When the submit button is clicked, inserts the project information
            into our database.
        */

        // Adds project to out database
        insertProject(projectName, projectDescription, managerID, projectEstimatedTime)
        .then(() => {
            console.log("PUSSIO");
            setActiveSection("addStaffSection");
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
        //TODO: Add project members to our database
    }

    // HTML Code
    return (
        <section className="add-project">
        <h2>Add a Project</h2>
       
        <article className="formatting">
            <p className = "labels">Name</p>
            <input
                value = {projectName} 
                className="input-name" 
                type="text" 
                placeholder="Enter a project name"
                onChange={(event) => {setProjectName(event.target.value)}}
            />
        </article>
       
        <article className="formatting">
            <p className = "labels">Description</p>
            <textarea 
                value = {projectDescription}
                maxLength="200" 
                rows="5" 
                placeholder="Enter a description"
                onChange={(event) => {setProjectDescription(event.target.value)}}
            >    
            </textarea>
        </article>

        <article className="formatting">
            <p className = "labels">Estimated Time</p>
            <input 
                value={projectEstimatedTime}
                className="input-time" 
                type="number"
                onChange={(event) => {setProjectEstimatedTime(event.target.value)}}
            /> 
            <p className = "hours">Hours</p>
        </article>

        <button className="create-project" onClick={handleButtonClick}> Add project</button>

    </section>
    );
}


const ManagerProjectPage = () => {
    // Variables
    const [projectName, setProjectName] = useState("");
    const [activeSection, setActiveSection] = useState("viewProjectSection");

    // Get the manager's Employee_ID
    const { employeeID } = useEmployee();
    const managerID = employeeID;

    // Functions & Logic
    const ViewProjectsButtonClicked = () => {
        /*
            Sets activeSection to viewProjectSection when the View Projects button is clicked
        */
        setActiveSection("viewProjectSection");
    }

    const AddProjectButtonClicked = () => {
        /*
            Sets activeSection to addProjectSection when the Add a Project button is clicked
        */
        setActiveSection("addProjectSection");
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
                    <button className="panelButtons" onClick={ViewProjectsButtonClicked}> View Projects</button>
                    <button className="panelButtons" onClick={AddProjectButtonClicked}>Add a Project</button>
                </section>

                {/* 
                    Displays view projects section when ViewProjects is true,
                    else displays add a project secton. 
                */}
                {activeSection === "viewProjectSection" && <ViewProjectsSection managerID={managerID}/> }
                {activeSection === "addProjectSection" && <AddProjectsSection projectName={projectName} setProjectName={setProjectName} managerID={managerID} setActiveSection={setActiveSection}/>}
                {activeSection === "addStaffSection" && <AddStaffSection projectName={projectName} managerID={managerID} setActiveSection={setActiveSection} />}
                
            </section>
        </>
    );
}
    
export default ManagerProjectPage;
