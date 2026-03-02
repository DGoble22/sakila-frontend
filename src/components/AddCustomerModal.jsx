import React, { useState } from "react";

export default function AddCustomerModal({ onClose, onRefresh }) {
    const [formData, setFormData] = useState({
        first_name: "", last_name: "", email: "",
        address: "", phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch('/api/customers', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                onRefresh();
                onClose();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">Add New Customer</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <form id="addForm" onSubmit={handleSubmit}>
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
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" form="addForm" className="btn btn-success" disabled={loading}>Add Customer</button>
                    </div>

                </div>
            </div>
        </div>
    );
}