import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";
import ViewProjectCardStaff from "../../Components/ViewProjectCard/VIewProjectCardStaff";
import { getAllEmployees, getStaffProjects, getProjectAssignedStaff, findManagerName } from "../../backend";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import "./StaffProjectPage.css";


const StaffProjectPage = ({ navigate }) => {
    // Variables
    const [projects, setProjects] = useState([]); // List of projects initialised to an empty array
    const [employeeData, setEmployeeData] = useState([]);
    const [assignedMembers, setAssignedMembers] = useState({});

    // Get the Staff's Employee_ID
    const { employeeID } = useEmployee();
    const StaffID = employeeID;


    // Functions & Logic
    useEffect(() => {
        // Gets all projects created by the manager
        async function getData() {
            await getStaffProjects(StaffID)
                .then((data) => {
                    setProjects(data) // stores projects data in the projects list 
                })
                .catch((errorMessage) => {
                    console.error(errorMessage); // Display any errors
                });
            
            // Gets all employees stored in the database
            await getAllEmployees()
                .then((data) => {
                    setEmployeeData(data)
                })
                .catch((errorMessage) => {
                    console.error(errorMessage); // Display any errors
                });
        }
        getData();
    }, [StaffID]);

    useEffect(() => {
        const fetchProjectMembers = async () => {
            const staffProjectObj = {};

            // Iterate through each project and fetch project members
            for (const project of projects) {
                const assignedStaff = await getProjectAssignedStaff(project.PROJECT_ID);
                staffProjectObj[project.PROJECT_ID] = assignedStaff;
            }
            setAssignedMembers(staffProjectObj);
        }

        fetchProjectMembers();
    }, [projects]);


    // redirect to HomePage
    const homePageButton = () => {
       navigate("/Staff");
   }

    // HTML Code
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
            </Header>

            <section className="view-project">
                <h2>View Projects</h2>
                <table >
                    <tbody>
                        <tr >
                            <th className="project-header-name">Name</th>
                            <th className="project-header-desc">Description</th>
                            <th className="project-header-manager">Manager</th>
                            <th className="project-header-est-time">Estimated Time</th>
                            <th className="project-header-members">Members</th>
                            <th className="feedback"></th>
                        </tr>

                    </tbody>
                </table>

                {/* Iterate through the projects list and display them */}
                {projects !== "error" ? projects.map((project) => (

                    <ViewProjectCardStaff 
                        key={project.PROJECT_ID}
                        projectID = {project.PROJECT_ID} 
                        name={project.PROJECT_NAME} 
                        manager={findManagerName(project.MANAGER_ID, employeeData)} 
                        description={project.DESCRIPTION} 
                        estimatedTime={project.ESTIMATED_TIME} 
                        members={assignedMembers[project.PROJECT_ID] || []}
                        navigate={navigate} 
                    />
                )
                ): ""}
            </section>

        </>

    );
}

export default StaffProjectPage;
