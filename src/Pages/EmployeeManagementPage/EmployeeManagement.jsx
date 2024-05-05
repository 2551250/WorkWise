import { React, useState, useEffect } from "react";

import { getAllEmployees, getAllStaffManagerData } from "../../backend";

import Header from "../../Components/Header/Header";
import EmployeeComponent from "../../Components/EmployeeComponent/EmployeeComponent";
import { deleteManager, deleteStaff } from "../../backend_post_requests";

import "./EmployeeManagement.css";
import { useNavigate } from "react-router";


const EmployeeManagement = () => {
    //Variables
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Functions & Logic
    useEffect(() => {
        getAllEmployees()
        .then((data) => {
            const AllStaffData = getAllStaffManagerData(data);
            setEmployees(AllStaffData);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, []);

    // redirect to HomePage
    const homePageButton = () => {
        navigate("/HR");
    }

    const handleDelete = async (employeeToDelete) => {
        try {
            let response = "";
            
            if (employeeToDelete.ROLE === "Staff"){
                response = await deleteStaff(employeeToDelete.EMPLOYEE_ID);
            }
            else if (employeeToDelete.ROLE === "Manager"){
                response = await deleteManager(employeeToDelete.EMPLOYEE_ID);
            }

            if (response.includes("successfully removed")) {
                const updatedEmployees = employees.filter((employee) => employee.EMPLOYEE_ID !== employeeToDelete.EMPLOYEE_ID);
                setEmployees(updatedEmployees);
            }
        } 
        catch(error) {
            console.log(error);
            return;
        }

    }

    // HTML Code
    return (
        <>
           <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
            </Header>
            <h2 className="employee-management-header">Employee Management</h2>

            <main className="list-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <th className="table-name">Name</th>
                            <th className="table-email">Email</th>
                            <th className="table-role">Role</th>
                            <th className="table-permissions">Change Permissions</th>
                            <th className="table-delete">Delete</th>
                        </tr>
                        {employees.map((employee) => (
                            <EmployeeComponent 
                                employee={employee} 
                                key={employee.EMAIL}
                                onDelete={handleDelete}
                            />
                        )
                        )}
                    </tbody>
                </table>
            </main>
            
        </>
    );
}

export default EmployeeManagement;