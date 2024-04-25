import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCard from "../../Components/ViewProjectCard/ViewProjectCard";
import { getAllProjects } from "../../backend";

import "./ManagerProjectPage.css";


// TODO: comment code!!!
const LoadViewProjectsSection = ({projects}) => {
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


const LoadAddProjectsSection = () => {

    return (
        <section className="view-project">
            <h2>Add Project</h2>
        </section>
    );
}


const ManagerProjectPage = () => {
    // Variable

    const [viewProjects, setViewProjects] = useState(true);
    const [projects, setProjects] = useState([]);

    // Functions & Logic
    useEffect(() => {
        getAllProjects()
        .then((data) => {
            setProjects(data)
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, []);

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
                 ? <LoadViewProjectsSection projects={projects}/> 
                 : <LoadAddProjectsSection/>
                }
                
            </section>
        </>
    );
}
    
export default ManagerProjectPage;
