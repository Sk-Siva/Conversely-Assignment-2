import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>REAL TIME STOCK MARKET APP</h1>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/trade">Trade</Link> | 
                <Link to="/dashboard">Dashboard</Link>
            </nav>
        </header>
    );
};

export default Header;
