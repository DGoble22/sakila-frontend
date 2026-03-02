import React, { useState, useEffect } from "react";

export default function CustomerDetailsModal({ customerId, onClose, onEdit, onRefresh }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDetails = async () => {
        try {
            const response = await fetch(`/api/customer-details/${customerId}`);
            if (!response.ok) throw new Error('Failed to fetch customer details');
            const data = await response.json();
            setDetails(data);
        } catch (error) {
            console.error("Error fetching customer details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [customerId]);

    // Format dates
    const formatDate = (dateString) => {
        if (!dateString) return "Not Returned";
        return new Date(dateString).toLocaleDateString();
    };

    const handleReturnFilm = async (rentalId) => {
        if (!window.confirm("Are you sure you would like to mark the film as returned?")) {
            return;
        }

        try {
            const response = await fetch(`/api/rentals/${rentalId}/return`, {
                method: "PUT"
            });
            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                fetchDetails();
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert("Failed to connect to the server.");
        }
    };

    const handleDelete = async () => {

        if (!window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await fetch(`/api/customers/${customerId}`, {
                method: "DELETE"
            });
            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                onRefresh();
                onClose();
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert("Failed to connect to the server.");
        }
    };

    return (

        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">Customer Details</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        {loading ? (
                            <p className="text-center mt-3">Loading customer profile...</p>
                        ) : details && details.profile ? (
                            <>
                                {/* Profile Section */}
                                <div className="card mb-4">
                                    <div className="card-body">

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h3 className="card-title mb-0">
                                                {details.profile.first_name} {details.profile.last_name}
                                            </h3>

                                            {/* Edit button & delete button */}
                                            <div className="d-flex flex-column gap-2 align-items-end">
                                                <button
                                                    className="btn btn-sm btn-outline-success w-100"
                                                    onClick={onEdit}
                                                >
                                                    Edit Customer
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger w-100"
                                                    onClick={handleDelete}
                                                >
                                                    Delete Customer
                                                </button>
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>Email:</strong> {details.profile.email}</p>
                                                <p><strong>Phone:</strong> {details.profile.phone || "N/A"}</p>
                                                <p><strong>Member Since:</strong> {formatDate(details.profile.create_date)}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Address:</strong> {details.profile.address}</p>
                                                <p><strong>City:</strong> {details.profile.city}</p>
                                                <p><strong>Zip:</strong> {details.profile.postal_code || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rental History Section */}
                                <h4>Recent Rentals</h4>
                                {details.rentals.length === 0 ? (
                                    <p className="text-muted">No rental history found.</p>
                                ) : (
                                    <table className="table table-sm table-striped">
                                        <thead className="table-light">
                                        <tr>
                                            <th>Film Title</th>
                                            <th>Rented On</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {details.rentals.map((rental, index) => (
                                            <tr key={index}>
                                                <td>{rental.title}</td>
                                                <td>{formatDate(rental.rental_date)}</td>
                                                <td>
                                                    {rental.return_date ? (
                                                        <span className="text-success">Returned on {formatDate(rental.return_date)}</span>
                                                    ) : (
                                                        <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleReturnFilm(rental.rental_id)}
                                                        >
                                                            Return Film
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        ) : (
                            <p className="text-danger text-center">Failed to load customer details.</p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

