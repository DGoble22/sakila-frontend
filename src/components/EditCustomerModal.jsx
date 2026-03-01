import React, { useState, useEffect } from "react";

export default function EditCustomerModal({ customerId, onClose, onRefresh }) {

    const [formData, setFormData] = useState({
        first_name: "", last_name: "", email: "",
        address: "", phone: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCurrentDetails = async () => {
            try {
                const response = await fetch(`/api/customer-details/${customerId}`);
                if (!response.ok) throw new Error("Failed to fetch customer data");
                const data = await response.json();

                const profile = data.profile;
                // prefill form with current details
                setFormData({
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    email: profile.email,
                    address: profile.address,
                    phone: profile.phone || ""
                });
            } catch (err) {
                setError("Could not load customer details.");
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentDetails();
    }, [customerId]);

    //handle typing in form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`/api/customers/${customerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            //refresh and close modal if successful, otherwise show error message
            if (response.ok) {
                alert(result.message);
                onRefresh();
                onClose();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Failed to connect to the server.");
        }
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header bg-danger">
                        <h5 className="modal-title">Edit Customer ID#{customerId}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {loading ? <p>Loading data...</p> : (
                            <form id="editForm" onSubmit={handleSubmit}>
                                {error && <div className="alert alert-danger py-2">{error}</div>}

                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label text-muted small mb-0">First Name</label>
                                        <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
                                    </div>
                                    <div className="col">
                                        <label className="form-label text-muted small mb-0">Last Name</label>
                                        <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-muted small mb-0">Email</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                                </div>

                                <div className="row mb-3">
                                    <div className="col-7">
                                        <label className="form-label text-muted small mb-0">Street Address</label>
                                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                                    </div>
                                    <div className="col-5">
                                        <label className="form-label text-muted small mb-0">Phone</label>
                                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" form="editForm" className="btn btn-success" disabled={loading}>Save Changes</button>
                    </div>

                </div>
            </div>
        </div>
    );
}