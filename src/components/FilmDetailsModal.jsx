import react, { useState, useEffect } from "react";

export default function FilmDetailsModal({ filmId, onClose }) {
    const [filmDetails, setFilmDetails] = useState(null);

    useEffect(() => {
        const fetchFilmDetails = async () => {
            try {
                const response = await fetch(`/api/film-details/${filmId}`);
                const data = await response.json();
                setFilmDetails(data);
            } catch (error) {
                console.error("Error fetching film details:", error);
            }
        };

        if (filmId) {
            fetchFilmDetails();
        }
    }, [filmId]);

    if (!filmDetails) return null; //Failed

    return (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)'}}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow-lg">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title fw-bold">{filmDetails.title}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <p><strong>Description:</strong> {filmDetails.description}</p>
                        <p><strong>Category:</strong> {filmDetails.category_name}</p>
                        <p><strong>Release Year:</strong> {filmDetails.release_year}</p>
                        <p><strong>Actors:</strong> {filmDetails.actors}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline-secondary px-4" onClick={onClose}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


