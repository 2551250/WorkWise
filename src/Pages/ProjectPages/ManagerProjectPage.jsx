import React, { useEffect, useState } from "react";
import Select from "react-select";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import { getAllEmployees, getAllProjects, getManagerProjects, getProjectAssignedStaff} from "../../backend";
import { insertProject, assignStaffToProjects } from "../../backend_post_requests";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./ManagerProjectPage.css";


const EmployeeSelector = ({groupName, data, setTrigger}) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const options = data.map((employee) => ({
        value: employee.EMPLOYEE_ID,
        label: `${employee.NAME} ${employee.SURNAME}`,
    }));

    const handleSelectChange = (selectedOptions) => {
        setSelectedEmployees(selectedOptions);
        setTrigger(selectedOptions.map((options) => options.value));
    }

    return (
        <section> 
            <h2> Select {groupName} </h2>
            <Select
                isMulti
                options={options}
                value={selectedEmployees}
                onChange={handleSelectChange}
                placeholder={`Select ${groupName}...`}
            />
        </section>
    );
}


const ViewProjectsSection = ({ managerID }) => {
    /*
        Displays the view projects section

        :param1 managerID: The employee id of the manager creating a project
        :returns HTML code: code for the actual section
    */

    // Variables
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array
    const [projectMembers, setProjectMembers] = useState({});

    // Functions & Logic
    useEffect(() => {
        // Gets all projects created by the manager
        getManagerProjects(managerID)
        .then((projectsData) => {
            // Get an array of promises for fetching project members
            const projectMemberPromises = projectsData.map(project => {
                return getProjectAssignedStaff(project.PROJECT_ID)
                    .then((members) => ({ projectId: project.PROJECT_ID, members }));
            });

            // Wait for all project member promises to resolve
            Promise.all(projectMemberPromises)
            .then(projectMemberData => {
                // Convert project member data to an object
                const projectMembersObj = projectMemberData.reduce((acc, curr) => {
                    acc[curr.projectId] = curr.members;
                    return acc;
                }, {});
    
                // Update project members state once with all data
                setProjects(projectsData);
                setProjectMembers(projectMembersObj);
            })
            .catch((errorMessage) => {
                console.error(errorMessage);
            });
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, [managerID]);
    

    // HTML Code
    return (
        <section className="view-project">
            <h2>View Projects</h2>

            {/* Iterate through the projects list and display them */}
            {projects.map((project) => (
                <ViewProjectCard 
                    key={project.PROJECT_ID} projectID={project.PROJECT_ID} 
                    name={project.PROJECT_NAME} description={project.DESCRIPTION} 
                    estimatedTime={project.ESTIMATED_TIME} members={projectMembers[project.PROJECT_ID] || []}
                />
            )
            )}
        </section>
    );
}


const AddProjectsSection = ({ managerID, setViewProjects, projects}) => {
    /*
        Displays the add a project section

        :param1 managerID: The employee id of the manager creating a project
        :param2 setViewProjects: Function to set the value of viewProject to false/true
        :returns HTML code: code for the actual section
    */

    // Variables
    const [staff, setStaff] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectEstimatedTime, setProjectEstimatedTime] = useState(0);
    const [projectMembers, setProjectsMembers] = useState([]);

    useEffect(() => {
        getAllEmployees()
        .then((data) => {
            setStaff(data);
        })
    }, []);

    // Functions & Logic
    const handleButtonClick = () => {
        /*
            When the submit button is clicked, inserts the project information
            into our database.
        */

        //TODO: Implement input validation

        //TODO: Find way to get members assigned to project

        // Adds project to out database
        insertProject(projectName, projectDescription, managerID, projectEstimatedTime);
        console.log(projects);

        getManagerProjects(managerID)
        .then((projects) => {
            console.log(projects.PROJECT_NAME);
        })
        .catch();
        
        //TODO: Add project members to our database
        console.log(projectMembers);

        // Moves manager to View Projects section
        setViewProjects(true);
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
        
        <EmployeeSelector 
            groupName="Staff" 
            data={staff || []} 
            setTrigger={setProjectsMembers}
        />

        <button className="create-project" onClick={handleButtonClick}> Add project</button>
        
    </section>
    );
}


const ManagerProjectPage = () => {
    // Variables
    const [viewProjects, setViewProjects] = useState(true);

    // Get the manager's Employee_ID
    const { employeeID } = useEmployee();
    const managerID = employeeID;

    // Functions & Logic
    const ViewProjectsButtonClicked = () => {
        /*
            Sets viewProject to true when the View Projects button is clicked
        */
        setViewProjects(true);
    }

    const AddProjectButtonClicked = () => {
        /*
            Sets viewProject to false when the Add a Project button is clicked
        */
        setViewProjects(false);
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
                {viewProjects 
                 ? <ViewProjectsSection managerID={managerID}/> 
                 : <AddProjectsSection managerID={managerID} setViewProjects={setViewProjects}/>
                }
                
            </section>
        </>
    );
}
    
export default ManagerProjectPage;
