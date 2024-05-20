import React from "react";
import "./Manager.css";
import { useNavigate } from "react-router-dom";

// Loading Card Icons from Assets Folder
import projectIcon from "../../Assets/project-icon.svg";
import peopleIcon from "../../Assets/people-icon.svg";

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


    // redirect to View Staff Page
    const viewStaffClicked = () => {
        navigate("/ViewStaff");
    }

    // Redirect to Login page
    const logoutClicked = () =>{
        navigate("/");
    }

    // HTML Code
    return(
        <>
        <Header>
            <h1>WorkWise</h1>
            <button className="logout-button" onClick={logoutClicked}>Log Out</button>
        </Header>

        <main className="homepage">
            <Card title="Projects" imgSrc={projectIcon} onClick={viewProductPage}/>
            <Card title="View Staff" imgSrc={peopleIcon} onClick={viewStaffClicked}/>
        </main>
        </>
    );
}

export default Manager;