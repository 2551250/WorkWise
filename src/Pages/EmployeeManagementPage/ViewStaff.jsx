import { React, useState, useEffect } from "react";

import { getAllEmployees, getAllStaffData } from "../../backend";

import Header from "../../Components/Header/Header";
import ViewStaffComponent from "../../Components/EmployeeComponent/ViewStaffComponent";
import "./EmployeeManagement.css";
import { useNavigate } from "react-router";


const ViewStaff = () => {
    //Variables
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Functions & Logic
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

    // redirect to Manager HomePage
    const homePageButton = () => {
        navigate("/Manager");
    }
    //Log out user
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
            <h2 className="employee-management-header2">View Staff</h2>

            <main className="list-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <th className="table-name">Name</th>
                            <th className="table-email">Email</th>
                            <th className="table-role">Role</th>
                        </tr>
                        {employees.map((employee) => (
                            <ViewStaffComponent 
                                employee={employee} 
                                key={employee.EMAIL}
                            />
                        )
                        )}
                    </tbody>
                </table>
            </main>
        </>
    );
}

export default ViewStaff;