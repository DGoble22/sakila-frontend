import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">Sakila</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Customer">Customer</Link></li>
                <li><Link to="/Films">Films</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar