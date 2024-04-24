import React from "react";
import "./Manager.css";

// Loading Card Icons from Assets Folder
import burgerIcon from "../../Assets/burger-icon.svg";
import projectIcon from "../../Assets/project-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";

import Card from "../../Components/Card/Card";


function Manager(){
    // Variables

    // Functions & Logic
    // empty function for unimplemented data
    const empty = () => {

    }

    // HTML Code
    return(
        <>
    <header className="heading">
            <h1>WorkWise</h1>
            <button className="logoutButton">Log Out</button>
        </header>
        <main className="homepage">
            <Card title="Timesheets" imgSrc={timesheetIcon} onClick={empty}/>
            <Card title="Projects" imgSrc={projectIcon} onClick={empty}/>
            <Card title="Plan Meals" imgSrc={burgerIcon} onClick={empty}/>
            <Card title="View Staff" imgSrc={peopleIcon} onClick={empty}/>
        </main>
        </>
    );
}

export default Manager;