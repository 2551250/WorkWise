import { React, useState, useEffect } from "react";

import { getAllEmployees, getAllStaffManagerData } from "../../backend";

import Header from "../../Components/Header/Header";
import EmployeeComponent from "../../Components/EmployeeComponent/EmployeeComponent";
import { deleteManager, deleteStaff } from "../../backend_post_requests";
import PopUp from "../../Components/PopUp/PopUp";
import "./EmployeeManagement.css";
import { useNavigate } from "react-router";


const EmployeeManagement = () => {
    //Variables
    const [employees, setEmployees] = useState([]);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    // Functions & Logic
    //Fetching all employeees and displaying them
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
  // Function to open delete confirmation pop-up
  const handleOpenDeletePopup = (employee) => {
    setEmployeeToDelete(employee);
    setDisplayPopup(true);
};
//CExecuting deletion of specific company member
    const handleDelete = async (employeeToDelete) => {
        try {
            if(!employeeToDelete||confirmDelete){
                return;
            }
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
        finally {
            // Close the pop-up
            setDisplayPopup(false);
            setConfirmDelete(false);
            setEmployeeToDelete({});
        }
}
        // Function to handle canceling the delete action
        const handleCancel = () => {
            setDisplayPopup(false);
            setConfirmDelete(false);
            setEmployeeToDelete({});
        };
        
        const logoutClicked = () =>{
            navigate("/");
        }
    
    // HTML Code
    return (
        <>
           <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button" onClick={logoutClicked}>Log Out</button>
            </Header>
            <h2 className="employee-management-header">Employee Management</h2>

            <main className="list-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <th className="table-name">Name</th>
                            <th className="table-email">Email</th>
                            <th className="table-role">Role</th>
                            <th className="table-delete">Delete</th>
                        </tr>
                        {employees.map((employee) => (
                            <EmployeeComponent 
                                employee={employee} 
                                key={employee.EMAIL}
                                onDelete={handleOpenDeletePopup}
                            />
                        )
                        )}
                    </tbody>
                </table>
            </main>
            <PopUp trigger={displayPopup} setTrigger={setDisplayPopup}>
                <h3 className="delete-employee-header">Delete: {employeeToDelete.NAME} {employeeToDelete.SURNAME}?</h3>
                <section className="delete-button-wrapper">
                <button className = 'delete-button' onClick={() => handleDelete(employeeToDelete)}>Confirm</button>
                 <button className = 'delete-button'  onClick={handleCancel}>Cancel</button>
                 </section>
            </PopUp>
        </>
    );
}

export default EmployeeManagement;