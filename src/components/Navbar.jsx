import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark shadow-sm py-3">
            <div className="container">
                {/* Logo */}
                <Link to="/" className="navbar-brand fw-bold">SAKILA</Link>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link px-3">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Customer" className="nav-link px-3">Customer</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Films" className="nav-link px-3">Films</Link>
                        </li>
                    </ul>
                </div>
                <div style={{ width: "80px" }} className="d-none d-lg-block"></div>
            </div>
        </nav>
    );
};

export default Navbar