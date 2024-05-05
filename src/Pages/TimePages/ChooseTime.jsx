import React from "react";
import stopwatchIcon from "../../Assets/stopwatch-icon.svg";
import clockfaceIcon from "../../Assets/clockface-icon.svg";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router";

const ChooseTime = ({ projectID, name }) =>{

    const navigate = useNavigate();

    const stopWatchButton = () => {

        // Project Data
        const project = {
            PROJECT_ID: projectID,
            PROJECT_NAME: name, 
        }
        // Use navigate function to go to another page
        navigate('/Timer', {state: project});
      };
          // redirect to HomePage
    const homePageButton = () => {
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
         <Card title="Add Time" imgSrc={clockfaceIcon} />
         <Card title="Stopwatch" imgSrc={stopwatchIcon} onClick={stopWatchButton}/>
         </main>
        </>



    );
}
export default ChooseTime;