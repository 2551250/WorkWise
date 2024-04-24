import React from "react";
import "./HR.css";
import { useNavigate } from "react-router-dom";

import burgerIcon from "../../Assets/burger-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";
import timesheetIcon from "../../Assets/timesheet-icon.svg";
import projectIcon from "../../Assets/project-icon.svg";

import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";

function HR() {
    const navigate = useNavigate();
    
    // redirects to EmployeeManagement page

     // redirect to Project Page
     const viewProductPage = () => {
        navigate("/HRProjectPage");
    }


    const viewStaffClicked = () => {
        navigate("/EmployeeManagement");
    }

    // empty function for unimplemented data
    const empty = () => {

    }

    return (
        <>
            <Header>
                <h1>WorkWise</h1>
                <button className="logoutButton">Log Out</button>
            </Header>
            <main className="homepage">
                <Card title="Timesheets" imgSrc={timesheetIcon} onClick={empty} />
                <Card title="Projects" imgSrc={projectIcon} onClick={viewProductPage}/>
                <Card title="Plan Meals" imgSrc={burgerIcon} onClick={empty} />
                <Card title="View Staff" imgSrc={peopleIcon} onClick={viewStaffClicked} />
            </main>
        </>
    );
}

export default HR;