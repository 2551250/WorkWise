import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import { getManagerProjects } from "../../backend";
import { insertProject } from "../../backend_post_requests";

import "./ManagerProjectPage.css";


// TODO: comment code!!!
const ViewProjectsSection = ({ managerID }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getManagerProjects(managerID)
        .then((data) => {
            setProjects(data)
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, []);

    return (
        <section className="view-project">
            <h2>View Projects</h2>
            {projects.map((project) => (
                <ViewProjectCard key={project.PROJECT_ID} name={project.PROJECT_NAME} description={project.DESCRIPTION} estimatedTime={project.ESTIMATED_TIME} members={["Member 1", "Member 2", "Member 3", "Member 4"]}/>
            )
            )}
        </section>
    );
}


// TODO: comment code!!!
const AddProjectsSection = ({ managerID, setViewProjects}) => {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectEstimatedTime, setProjectEstimatedTime] = useState(0);
    const [projectMembers, setProjectsMembers] = useState([]);

    const handleButtonClick = () => {
        //TODO: Implement input validation

        // TODO: Find way to get members assigned to project
        setProjectsMembers(["Member 1", "Member 2", "Member 3", "Member 4"])
        // console.log(projectName, projectDescription, projectEstimatedTime, projectMembers);

        insertProject(projectName, projectDescription, managerID, projectEstimatedTime);
        setViewProjects(true);
    }

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
    //TODO: Find a way to get a managers Employee_ID
    const managerID = 5;

    // Functions & Logic

    //TODO: comment code!!!
    const ViewProjectsButtonClicked = () => {
        setViewProjects(true);
    }

    const AddProjectButtonClicked = () => {
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

                {viewProjects 
                 ? <ViewProjectsSection managerID={managerID}/> 
                 : <AddProjectsSection managerID={managerID} setViewProjects={setViewProjects}/>
                }
                
            </section>
        </>
    );
}
    
export default ManagerProjectPage;
