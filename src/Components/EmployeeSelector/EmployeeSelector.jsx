import React, {useState} from "react";
import Select from "react-select";
import "./EmployeeSelector.css"

// Multi-select drop-box made using react-select 
const EmployeeSelector = ({groupName, data, setTrigger}) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const options = data.map((employee) => ({
        value: employee.EMPLOYEE_ID,
        label: `${employee.NAME} ${employee.SURNAME}`,
    }));

    const handleSelectChange = (selectedOptions) => {
        setSelectedEmployees(selectedOptions);
        setTrigger(selectedOptions.map((options) => options.value));
    }

    return (
        <section className="selector-dropbox"> 
            <h3> Select {groupName} </h3>
            <Select
                isMulti
                options={options}
                value={selectedEmployees}
                onChange={handleSelectChange}
                placeholder={`Select ${groupName}...`}
            />
        </section>
    );
}

export default EmployeeSelector;
