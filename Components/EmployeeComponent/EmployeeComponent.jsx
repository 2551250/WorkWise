import React from "react";
import "./EmployeeComponent.css";

const EmployeeComponent = ({ employee }) => {
    return (
        <tr>
            <td className="employee-data"><p>{employee.NAME.concat(" ", employee.SURNAME)}</p></td>
            <td className="employee-data"><p>{employee.EMAIL}</p></td>
            <td className="employee-data"><button>Change Permission</button></td>
            <td className="employee-data"><button>Delete</button></td>
        </tr>
    );
}

export default EmployeeComponent;
