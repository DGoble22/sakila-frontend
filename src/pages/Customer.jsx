import React, {useEffect, useState} from "react";

export default function Customer() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchCustomers = async () => {
            // Prevents displaying all customers when search bar is empty
            if (!searchTerm.trim()) {
                setCustomers([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`/api/customers?search=${encodeURIComponent(searchTerm)}`);
                if (!response.ok) {
                    throw new Error('Bad Network Response');
                }
                const data = await response.json();
                setCustomers(data);
                setCurrentPage(1); // Reset to page 1 on new search
            } catch (error) {
                console.error('Error fetching customers:', error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search to reduce API calls while typing
        const timeoutId = setTimeout(() => {fetchCustomers();}, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    // pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(customers.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1 className="mb-4">Customer Search</h1>
            </div>

            <div>
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-danger">Search</button>
                </form>

                {/* Loading */}
                {loading && <p className="text-center">Loading customers...</p>}

                {/* Results Table */}
                {!loading && customers.length > 0 && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map((customer) => (
                                <tr key={customer.customer_id} style={{cursor: 'pointer'}}>
                                    <td>{customer.first_name} {customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.city}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <button className="btn btn-sm btn-danger">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                {!loading && customers.length > itemsPerPage && (
                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}

                {/* No Results */}
                {!loading && searchTerm && customers.length === 0 && (<p className="text-center">No customers found with search: "<strong>{searchTerm}</strong>"</p>)}
            </div>

            {/* Customer Details Modal*/}

        </div>
    );
}

