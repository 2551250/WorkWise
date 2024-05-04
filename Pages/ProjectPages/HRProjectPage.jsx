import React from "react";

import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router";

const HRProjectPage = () => {

    const navigate = useNavigate();

    // redirect to HomePage
    const homePageButton = () => {
        navigate("/HR");
    }
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
            </Header>
        </>
    );
}
    
export default HRProjectPage;
