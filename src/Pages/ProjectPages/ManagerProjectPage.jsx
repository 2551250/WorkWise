import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import { getManagerProjects } from "../../backend";
import { insertProject } from "../../backend_post_requests";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./ManagerProjectPage.css";


const ViewProjectsSection = ({ managerID }) => {
    /*
        Displays the view projects section

        :param1 managerID: The employee id of the manager creating a project
        :returns HTML code: code for the actual section
    */

    // Variables
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array

    // Functions & Logic
    useEffect(() => {
        // Gets all projects created by the manager
        getManagerProjects(managerID)
        .then((data) => {
            setProjects(data) // stores projects data in the projects list 
        })
        .catch((errorMessage) => {
            console.error(errorMessage); // Display any errors
        });
    }, [managerID]);

    // HTML Code
    return (
        <section className="view-project">
            <h2>View Projects</h2>
            
            {/* Iterate through the projects list and display them */}
            {projects.map((project) => (
                <ViewProjectCard key={project.PROJECT_ID} name={project.PROJECT_NAME} description={project.DESCRIPTION} estimatedTime={project.ESTIMATED_TIME} members={["Member 1", "Member 2", "Member 3", "Member 4"]}/>
            )
            )}
        </section>
    );
}


const AddProjectsSection = ({ managerID, setViewProjects}) => {
    /*
        Displays the add a project section

        :param1 managerID: The employee id of the manager creating a project
        :param2 setViewProjects: Function to set the value of viewProject to false/true
        :returns HTML code: code for the actual section
    */

    // Variables
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectEstimatedTime, setProjectEstimatedTime] = useState(0);
    const [projectMembers, setProjectsMembers] = useState([]);

    // Functions & Logic
    const handleButtonClick = () => {
        /*
            When the submit button is clicked, inserts the project information
            into our database.
        */

        //TODO: Implement input validation

        //TODO: Find way to get members assigned to project
        setProjectsMembers(["Member 1", "Member 2", "Member 3", "Member 4"])

        // Adds project to out database
        insertProject(projectName, projectDescription, managerID, projectEstimatedTime);
        
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
        
        <article className="formatting"> 
            <p className = "labels">Member 1</p>
            <input className = "member-input" placeholder="Enter a staff member"/>
        </article>
        
        <article className="formatting"> 
            <p className = "labels">Member 2</p>
            <input className = "member-input" placeholder="Enter a staff member"/>
        </article>
        
        <article className="formatting"> 
            <p className = "labels">Member 3</p>
            <input className = "member-input" placeholder="Enter a staff member"/>
        </article>
        
        <article className="formatting"> 
            <p className = "labels">Member 4</p>
            <input className = "member-input" placeholder="Enter a staff member"/>
        </article>
        
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
