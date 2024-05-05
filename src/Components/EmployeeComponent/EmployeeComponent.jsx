import React from "react";
import "./EmployeeComponent.css";

const EmployeeComponent = ({ employee, onDelete }) => {
    // Component to display a row of employee's information
    return (
        <tr>
            <td className="employee-name"><p>{employee.NAME.concat(" ", employee.SURNAME)}</p></td>
            <td className="employee-email"><p>{employee.EMAIL}</p></td>
            <td className="employee-role"><p>{employee.ROLE}</p></td>
            <td className="employee-permissions"><button className="permission-button">Change Permissions</button></td>
            <td className="employee-delete">
                <button className="delete-button" onClick={() => onDelete(employee)}>Delete</button>
            </td>
        </tr>
    );
}

export default EmployeeComponent;
