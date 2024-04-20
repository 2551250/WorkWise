import React from "react";
import "./Staff.css";

import burgerIcon from "../../Assets/burger-icon.svg";
import feedbackIcon from "../../Assets/feedback-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";

import Card from "../../Components/Card/Card";


function Staff(){
    return(
        <>
    <header className="heading">
            <h1>WorkWise</h1>
            <button className="logoutButton">Log Out</button>
        </header>
        <main className="homepage">
            <Card title="Timesheets" imgSrc={timesheetIcon}/>
            <Card title="Feedback" imgSrc={feedbackIcon}/>
            <Card title="Book Meals" imgSrc={burgerIcon}/>
        </main>
        </>
    );
}

export default Staff;