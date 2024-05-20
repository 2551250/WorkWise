import React from "react";
import "./HR.css";
import { useNavigate } from "react-router-dom";

import projectIcon from "../../Assets/project-icon.svg";
import burgerIcon from "../../Assets/burger-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";

import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";

function HR() {
    const navigate = useNavigate();
    
    // redirects to EmployeeManagement page
    const viewStaffClicked = () => {
        navigate("/EmployeeManagement");
    }

    const viewPlanMealPage = () => {
        navigate("/HRBookMeals");
    }
      const viewProjectsClicked = () => {
        navigate("/HRProjectPage");
    }

    const logoutClicked = () =>{
        navigate("/");
    }

    return (
        <>
            <Header>
                <h1>WorkWise</h1>
                <button className="logout-button" onClick={logoutClicked}>Log Out</button>
            </Header>
            <main className="homepage">
                <Card title="Plan Meals" imgSrc={burgerIcon} onClick={viewPlanMealPage} />
                <Card title="View Staff" imgSrc={peopleIcon} onClick={viewStaffClicked} />
                <Card title="Projects" imgSrc={projectIcon}  onClick={viewProjectsClicked} />
            </main>
        </>
    );
}

export default HR;