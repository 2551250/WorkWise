import { React, useState, useEffect} from "react";
import EmployeeComponent from "./EmployeeComponent";
import { list } from "../../backend";

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
        <section className="wrapper">
            <h1>Employee Management</h1>

            {employees.map((employee) => (
                <EmployeeComponent employee={employee} />
            )
            )}

        </section>

    );
}

export default EmployeeManagement;