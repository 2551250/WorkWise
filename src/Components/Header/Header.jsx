import React from "react";

import "./Header.css";

// Header component of website
const Header = ({ children }) => {
    return (
        <header className="webapp-header">
            {children}
        </header>
    );
}

export default Header;
