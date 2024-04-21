import { React, useState, useEffect } from "react";
import EmployeeComponent from "./EmployeeComponent";
import { list } from "../../backend";
import "./EmployeeManagement.css";

function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);

    const getData = async () => {
        const data = await list();
        setEmployees(data);
    }

    useEffect(() => {
        getData();
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