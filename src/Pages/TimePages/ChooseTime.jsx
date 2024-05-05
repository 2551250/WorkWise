import React from "react";
import stopwatchIcon from "../../Assets/stopwatch-icon.svg";
import clockfaceIcon from "../../Assets/clockface-icon.svg";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import { useLocation, useNavigate } from "react-router";

const ChooseTime = () =>{
    //Variables
    const location = useLocation();
    const projectData = location.state;
    const navigate = useNavigate();

    const manualTimeButton = () => {
        // Use navigate function to go to another page
        navigate('/ManualTimer', {state: projectData});
    }

    const stopWatchButton = () => {
        // Use navigate function to go to another page
        navigate('/Timer', {state: projectData});
      };
    
    const homePageButton = () => {
        // redirect to HomePage
        navigate("/Staff");
    }

    return(
        <>
        <Header>
            <h1>WorkWise</h1>
            <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
            <button className="logout-button">Log Out</button>
        </Header>
        <main className="homepage">
         <Card title="Add Time" imgSrc={clockfaceIcon} onClick={manualTimeButton}/>
         <Card title="Stopwatch" imgSrc={stopwatchIcon} onClick={stopWatchButton}/>
         </main>
        </>



    );
}
export default ChooseTime;