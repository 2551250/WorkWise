import React, { createContext, useContext, useState, useEffect } from "react";

//Create a context
const EmployeeContext = createContext();


const EmployeeProvider = ({ children }) => {
    const [employeeID, setEmployeeID] = useState(() => localStorage.getItem('employeeID'));

    useEffect(() => {
        // Store employeeID in localStorage when it changes
        localStorage.setItem('employeeID', employeeID);
    }, [employeeID]);

    return (
        <EmployeeContext.Provider value={{ employeeID, setEmployeeID }}>
            {children}
        </EmployeeContext.Provider>
    );
}


const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export {EmployeeProvider, useEmployee}