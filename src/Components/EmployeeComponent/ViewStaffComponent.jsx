import React from "react";
import "./EmployeeComponent.css";

const ViewStaffComponent = ({ employee }) => {
    // Component to display a row of employee's information
    return (
        <tr>
            <td className="employee-name2"><p>{employee.NAME.concat(" ", employee.SURNAME)}</p></td>
            <td className="employee-email2"><p>{employee.EMAIL}</p></td>
            <td className="employee-role2"><p>{employee.ROLE}</p></td>
        </tr>
    );
}

export default ViewStaffComponent;
