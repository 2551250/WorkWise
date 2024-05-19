import React from "react";
import "./EmployeeComponent.css";

const ViewStaffComponent = ({ employee }) => {
    // Component to display a row of employee's information
    return (
        <tr>
            <td className="employee-name"><p>{employee.NAME.concat(" ", employee.SURNAME)}</p></td>
            <td className="employee-email"><p>{employee.EMAIL}</p></td>
            <td className="employee-role"><p>{employee.ROLE}</p></td>
        </tr>
    );
}

export default ViewStaffComponent;
