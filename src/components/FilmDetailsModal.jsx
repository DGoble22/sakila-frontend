import { useState, useEffect } from "react";
import SakilaMovieImage from "../assets/SakilaMovie.png";

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

                    {/* Header */ }
                    <div className="modal-header text-white" style={{background: 'linear-gradient(90deg, #ff0000 0%, #000000 100%)'}}>
                        <h5 className="modal-title fw-bold">{filmDetails.title} ({filmDetails.release_year})</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">

                        {/* Img of film and details*/ }
                        <div className="text-center mb-4">
                            <img src={SakilaMovieImage} alt={filmDetails.title} className="img-fluid rounded shadow" style={{maxHeight: '300px', objectFit: 'cover'}}/>
                        </div>
                        <p><strong>Category:</strong> {filmDetails.category_name}</p>
                        <p><strong>Description:</strong> {filmDetails.description}</p>
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


