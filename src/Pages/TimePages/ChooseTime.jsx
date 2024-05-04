import React from "react";
import stopwatchIcon from "../../Assets/stopwatch-icon.svg";
import clockfaceIcon from "../../Assets/clockface-icon.svg";
const ChooseTime = () =>{
    return(
        <>
        <Header>
            <h1>WorkWise</h1>
            <button className="logoutButton">Log Out</button>
        </Header>
        <main className="homepage">
         <Card title="Add Time" imgSrc={clockfaceIcon}/>
         <Card title="Stopwatch" imgSrc={stopwatchIcon}/>
         </main>
        </>



    );
}
export default ChooseTime;