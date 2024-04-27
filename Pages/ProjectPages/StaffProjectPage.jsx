import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCardStaff from "../../Components/ViewProjectCard/VIewProjectCardStaff";
import { getAllEmployees, getStaffProjects } from "../../backend";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./StaffProjectPage.css";


const findManagerName = (Employee_ID, data) => {
    const manager = data.find(employee => employee.EMPLOYEE_ID === parseInt(Employee_ID));
    
    return manager ? `${manager.NAME} ${manager.SURNAME}` : 'Manager not found'; // Return manager name or a default message
  }


const StaffProjectPage = () => {
    // Variables
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array
    const [employeeData, setEmployeeData] = useState([]);

    // Get the Staff's Employee_ID
    const { employeeID } = useEmployee();
    const StaffID = employeeID;

    // Functions & Logic
    

    // Functions & Logic
    useEffect(() => {
        // Gets all projects created by the manager
        getStaffProjects(StaffID)
        .then((data) => {
            setProjects(data) // stores projects data in the projects list 
        })
        .catch((errorMessage) => {
            console.error(errorMessage); // Display any errors
        });

        getAllEmployees()
        .then((data) => {
            setEmployeeData(data)
        })
        .catch((errorMessage) => {
            console.error(errorMessage); // Display any errors
        });

    }, [StaffID]);
    console.log(projects);

    //  function to fetch manager data from an API endpoint

  
  // Function to find manager name by ID
  

  
  // Example usage


  


    // HTML Code
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="logoutButton">Log Out</button>
            </Header> 

            <section className="view-project">
                <h2>View Projects</h2>
                <table >
                    <tbody>
                        
                            <tr > 
                                <td className="project-name"><th>Name</th></td>
                                <td className="project-desc"><th>Description</th></td>
                                <td className="project-manager"><th>Manager</th></td>
                                <td className="project-est-time"><th>Etimated Time</th></td>
                                <td className="project-members"><th>Members</th></td>
                                <td className="feedback"></td>
                                
                            </tr>
                       
                    </tbody>
                </table>
                
                {/* Iterate through the projects list and display them */}
                {projects.map((project) => (
                   
                    <ViewProjectCardStaff key={project.PROJECT_ID} name={project.PROJECT_NAME} manager={findManagerName(project.MANAGER_ID, employeeData)} description={project.DESCRIPTION} estimatedTime={project.ESTIMATED_TIME} members={["Member 1", "Member 2", "Member 3", "Member 4"]}/>
                    
                )
                )}
            </section>

        </>
        
    );
}
    
export default StaffProjectPage;
