import { useState, useEffect } from "react";
import SakilaActorImage from "../assets/SakilaActor.png";

export default function ActorDetailsModal({ actorId, actorName, onClose }) {
    const [actorDetails, setActorDetails] = useState(null);

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                const response = await fetch(`/api/actor-details/${actorId}`);
                const data = await response.json();
                setActorDetails(data);
            } catch (error) {
                console.error("Error fetching actor details:", error);
            }
        };

        if (actorId) {
            fetchActorDetails();
        }
    }, [actorId]);

    return (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)'}}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow-lg">

                    {/* Header */}
                    <div className="modal-header bg-dark text-white justify-content-center" style={{background: 'linear-gradient(90deg, #ff0000 0%, #000000 100%)'}}>
                        <h5 className="modal-title fw-bold">{actorName}</h5>
                        <button type="button" className="btn-close btn-close-white position-absolute end-0 me-3" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-4">

                        {/* Img of actor */}
                        <div className="text-center mb-4">
                            <img src={SakilaActorImage} alt={actorName} className="img-fluid rounded" style={{maxHeight: '300px', objectFit: 'cover'}}/>
                        </div>

                        {/* Table to show actor's top 5 films */}
                        {actorDetails ? (
                            <>
                                <h6 className="fw-bold mb-3 text-center">Top 5 Films</h6>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Film Title</th>
                                            <th className="text-end">Rental Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actorDetails.map((film) => (
                                            <tr key={film.film_id}>
                                                <td>{film.film_title}</td>
                                                <td className="text-end">{film.rental_count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p className="text-center">Loading films...</p>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-outline-secondary px-4" onClick={onClose}>Back</button>
                    </div>

                </div>
            </div>
        </div>
    );
}


