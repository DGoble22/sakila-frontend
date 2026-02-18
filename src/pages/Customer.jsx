import React, {useEffect, useState} from "react";

export default function Customer() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

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
                            {customers.map((customer) => (
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

                {/* No Results */}
                {!loading && searchTerm && customers.length === 0 && (<p className="text-center">No customers found with search: "<strong>{searchTerm}</strong>"</p>)}
            </div>

            {/* Customer Details Modal*/}

        </div>
    );
}

