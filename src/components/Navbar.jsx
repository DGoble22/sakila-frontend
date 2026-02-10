import React from "react";
import {Link, useLocation} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand navbar-dark navbar-gradient shadow-lg">
            <div className="container-fluid px-4">
                {/* Sakila Logo */}
                <Link to="/" className="navbar-brand fw-bold fs-3">SAKILA</Link>

                {/* Navbar center links */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto gap-2">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Customer" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/Customer' ? 'active' : ''}`}>
                                Customers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Films" className={`nav-link px-4 py-2 rounded-pill fw-semibold ${location.pathname === '/Films' ? 'active' : ''}`}>
                                Films
                            </Link>
                        </li>
                    </ul>
                </div>
                <div style={{ width: "100px" }} className="d-none d-lg-block"></div>
            </div>
        </nav>
    );
};

export default Navbar