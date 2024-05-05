import { React, useState, useEffect } from "react";

import { getAllEmployees } from "../../backend";

import Header from "../../Components/Header/Header";
import EmployeeComponent from "../../Components/EmployeeComponent/EmployeeComponent";
import { deleteManager, deleteStaff } from "../../backend_post_requests";

import "./EmployeeManagement.css";
import { useNavigate } from "react-router";


const getAllStaffData = (data) => {
    /* 
        Gets all the data on employees whose roles are Staff.
        
        :param data: json of all the data in Employee datatable
        :return: An array filtered to contain staff data
    */
    return data.filter((employee) => employee.ROLE === "Manager" || employee.ROLE === "Staff"); //filteres data by staff and HR;
}


const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees()
        .then((data) => {
            const AllStaffData = getAllStaffData(data);
            setEmployees(AllStaffData);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
        });
    }, []);


    
    // Function to handle deletion of an employee
    const handleDelete = (employeeToDelete) => {
        const deleteFunction = employeeToDelete.ROLE === "Staff" ? deleteStaff : deleteManager;
        deleteFunction(employeeToDelete.EMPLOYEE_ID)
            .then(() => {
                // Update the list of employees after deletion
                const updatedEmployees = employees.filter((employee) => employee.EMPLOYEE_ID !== employeeToDelete.EMPLOYEE_ID);
                setEmployees(updatedEmployees);
                console.log("Deleting Employee with ID:", employeeToDelete.EMPLOYEE_ID);
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    };

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
            <h2 className="employee-management-header">Employee Management</h2>

            <main className="list-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <th className="table-name">Name</th>
                            <th className="table-email">Email</th>
                            <th className="table-name">Role</th>
                            <th className="table-permissions">Change Permissions</th>
                            <th className="table-delete">Delete</th>
                        </tr>
                        {employees.map((employee) => (
                            <EmployeeComponent employee={employee} 
                            key={employee.EMAIL}
                            onDelete={handleDelete} // Pass the onDelete callback function
                            />
                        )
                        )}
                    </tbody>
                </table>
            </main>
            
        </>
    );
}

export {getAllStaffData};
export default EmployeeManagement;