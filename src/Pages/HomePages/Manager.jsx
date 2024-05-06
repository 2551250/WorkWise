import React from "react";
import "./Manager.css";
import { useNavigate } from "react-router-dom";

// Loading Card Icons from Assets Folder
import burgerIcon from "../../Assets/burger-icon.svg";
import projectIcon from "../../Assets/project-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";
import messageIcon from "../../Assets/message-icon.svg";

import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";

function Manager(){
    // Variables
    const navigate = useNavigate();

    // Functions & Logic
    
    // redirect to Project Page
    const viewProductPage = () => {
        navigate("/ManagerProjectPage");
    }

    // empty function for unimplemented data
    const empty = () => {

    }

    // HTML Code
    return(
        <>
        <Header>
            <h1>WorkWise</h1>
            <button className="logout-button">Log Out</button>
        </Header>

        <main className="homepage">
            <Card title="Timesheets" imgSrc={timesheetIcon} onClick={empty}/>
            <Card title="Projects" imgSrc={projectIcon} onClick={viewProductPage}/>
            <Card title="Chat" imgSrc={messageIcon}/>
            <Card title="Plan Meals" imgSrc={burgerIcon} onClick={empty}/>
            <Card title="View Staff" imgSrc={peopleIcon} onClick={empty}/>
        </main>
        </>
    );
}

export default Manager;