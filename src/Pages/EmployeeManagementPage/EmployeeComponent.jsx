import React from "react";
import "./EmployeeManagement.css";

const EmployeeComponent = ({ employee }) => {
    return (
        <tr>
            <td className="table-element"><p>{employee.NAME.concat(" ", employee.SURNAME)}</p></td>
            <td className="table-element"><p>{employee.EMAIL}</p></td>
            <td className="table-element"><button>Change Permission</button></td>
            <td className="table-element"><button>Delete</button></td>
        </tr>
    );
}

export default EmployeeComponent;