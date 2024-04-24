import React from "react";


const Header = ({ children }) => {
    return (
        <header className="webapp-header">
            {children}
        </header>
    );
}

export default Header;
