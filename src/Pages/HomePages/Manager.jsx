import React from "react";
import "./Manager.css";

import burgerIcon from "../../Assets/burger-icon.svg";
import feedbackIcon from "../../Assets/feedback-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";

import Card from "../../Components/Card/Card";


function Manager(){
    return(
        <>
    <header className="heading">
            <h1>WorkWise</h1>
            <button className="logoutButton">Log Out</button>
        </header>
        <main className="homepage">
            <Card title="Timesheets" imgSrc={timesheetIcon}/>
            <Card title="Feedback" imgSrc={feedbackIcon}/>
            <Card title="Plan Meals" imgSrc={burgerIcon}/>
            <Card title="View Staff" imgSrc={peopleIcon}/>
        </main>
        </>
    );
}

export default Manager;