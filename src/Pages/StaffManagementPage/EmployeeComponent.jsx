import React from "react";
import "./EmployeeManagement.css";

const EmployeeComponent = ({ employee }) => {
    return (
        <div className="employee-component">
            <p>{employee.NAME.concat(" ", employee.SURNAME)}</p>
            <p>{employee.EMAIL}</p>
            <button>Change Permission</button>
            <button>Delete</button>
        </div>
    );
}

export default EmployeeComponent;