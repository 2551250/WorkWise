import { React, useState, useEffect } from "react";
import EmployeeComponent from "./EmployeeComponent";
import { list } from "../../backend";
import "./EmployeeManagement.css";

const getAllStaffData = (data) => {
    /* 
        Gets all the data on employees whose roles are Staff.

        :return: An array filtered to contain staff data
    */
    return data.filter((employee) => employee.ROLE === "Staff"); //filteres data by staff;
}

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        list()
        .then((data) => {
            const AllStaffData = getAllStaffData(data);
            setEmployees(AllStaffData);
        })
        .catch((errorMessage) => {
            console.error(errorMessage);
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

export {getAllStaffData};
export default EmployeeManagement;