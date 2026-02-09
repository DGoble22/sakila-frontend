import react, { useState, useEffect } from "react";

export default function ActorDetailsModal({ actorId, onClose }) {
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

    if (!actorDetails) return null; //Failed

    return (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)'}}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow-lg">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title fw-bold">{actorDetails.actor_name}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <p><strong>Movies seen in: </strong> {actorDetails.films}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline-secondary px-4" onClick={onClose}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


