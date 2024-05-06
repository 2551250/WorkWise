import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";

import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import { getAllEmployees} from "../../backend";


const getRoleFromID = (employeeID, data) => {
    // Finds the role of an employee -> {Staff, Manager, HR}
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj.EMPLOYEE_ID === employeeID) {
            return obj.ROLE; // returns the role
            }
        }
    return "";
}


// const ChatSection = ({projectName, employeeID}) => {
//     // Variables

//     //Functions & Logic

//     // HTML Code
//     return (
//         <>
//         </>
//     );
// }


const StaffProjectViewSection = (staffID) => {
    // Variables

    //Functions & Logic
    console.log(staffID);

    // HTML Code
    return (
        <>
        <h1> Staff View Projects</h1>
        </>
    );
}


const ManagerProjectViewSection = (managerID) => {
    // Variables
    const [createdProjects, setCreatedProjects] = useState();
    
    //Functions & Logic
    console.log(managerID);

    // HTML Code
    return (
        <>
        <h1> Manager View Projects</h1>
        </>
    );
}


const ChatPage = () => {
    // Variables
    const { employeeID } = useEmployee();
    employeeID = parseInt(employeeID);
    const [role, setRole] = useState("");

    //Functions & Logic
    useEffect(() => {
        const fetchData = async (employeeID) => {
            const employeeData = await getAllEmployees();

            if (typeof(employeeData) !== "string"){
                setRole(getRoleFromID(employeeID, employeeData));
            }
        }

        fetchData(employeeID);
    }, [employeeID])

    // HTML Code
    return(
        <>
          <Header>
                <h1> Workwise </h1>
                <button className="logout-button">Log Out</button>
            </Header>

            {
                role === "Manager" 
                ? <ManagerProjectViewSection managerID={employeeID}/> 
                : <StaffProjectViewSection staffID={employeeID}/>
            }
        </>
    );
}

export default ChatPage;