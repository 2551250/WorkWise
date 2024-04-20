import React from "react";
import "./HR.css";
import { useNavigate } from "react-router-dom";

import burgerIcon from "../../Assets/burger-icon.svg";
import feedbackIcon from "../../Assets/feedback-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";

import Card from "../../Components/Card/Card";

function HR() {
    const navigate = useNavigate();
    
    const viewStaffClicked = () => {
        navigate("/EmployeeManagement");
    }

    const empty = () => {

    }

    return (
        <>
            <header className="heading">
                <h1>WorkWise</h1>
                <button className="logoutButton">Log Out</button>
            </header>
            <main className="homepage">
                <Card title="Timesheets" imgSrc={timesheetIcon} onClick={empty} />
                <Card title="Feedback" imgSrc={feedbackIcon} onClick={empty} />
                <Card title="Plan Meals" imgSrc={burgerIcon} onClick={empty} />
                <Card title="View Staff" imgSrc={peopleIcon} onClick={viewStaffClicked} />
            </main>
        </>
    );
}

export default HR;