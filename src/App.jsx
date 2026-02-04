import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

//Page Imports
import Home from "./pages/Home.jsx";
import Customer from "./pages/Customer.jsx";
import Films from "./pages/Films.jsx";

//Main sakila function
function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <main style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/Customer" element={<Customer/>} />
                        <Route path="/Films" element={<Films/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
