import { React, useState, useEffect } from "react";
import EmployeeComponent from "./EmployeeComponent";
import { list } from "../../backend";
import "./EmployeeManagement.css";

const getAllStaffData = async () => {
    /* 
        Gets all the data on employees whose roles are Staff.

        :return: An array filtered to contain staff data
    */
    const data = await list(); // Gets all the data
    return data.filter((employee) => employee.ROLE === "Staff"); //filteres data by staff;
}

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllStaffData(setEmployees)
        .then((data) => {
            setEmployees(data)
        })
        .catch(function (errorMessage) {
            //error handler function is invoked 
            console.log(errorMessage);
        });

    }, []);

    return (
        <>
            <header className="heading">
                <h1>Employee Management</h1>
                <button className="logoutButton">Log Out</button>
            </header>
            <main className="wrapper">
                <table>
                    <tbody>
                        <tr>
                            <th className="table-element">Name</th>
                            <th className="table-element">Email</th>
                            <th className="table-element">Change Permissions</th>
                            <th className="table-element">Delete</th>
                        </tr>
                        {employees.map((employee) => (
                            <EmployeeComponent employee={employee} key={employee.EMAIL} />
                        )
                        )}
                    </tbody>
                </table>
            </main>
        </>
    );
}

export default EmployeeManagement;