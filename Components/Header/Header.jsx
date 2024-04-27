import React from "react";

import "./Header.css";

const Header = ({ children }) => {
    return (
        <header className="webapp-header">
            {children}
        </header>
    );
}

export default Header;
