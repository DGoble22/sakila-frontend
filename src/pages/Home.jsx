import React from "react";
import {useEffect, useState} from "react";
import FilmDetailsModal from "../components/FilmDetailsModal";
import ActorDetailsModal from "../components/ActorDetailsModal";

export default function Home() {

    /* States for tables */
    const [topFilms, setTopFilms] = useState([]);
    const [loadingTopFilms, setLoadingTopFilms] = useState(true);
    const [selectedFilmId, setSelectedFilmId] = useState(null);

    const [topActors, setTopActors] = useState([]);
    const [loadingTopActors, setLoadingTopActors] = useState(true);
    const [selectedActor, setSelectedActor] = useState(null);

    /* States and hook for top films table */
    useEffect(() => {
        const fetchTopFilms = async () => {
            try {
                const response = await fetch('/api/top-films');
                if (!response.ok) {
                    throw new Error('Bad Network Response');
                }
                const data = await response.json();
                setTopFilms(data);
            } catch (error) {
                console.error('Error fetching top films:', error);
            } finally {
                setLoadingTopFilms(false);
            }
        };

        fetchTopFilms()
    }, []);

    /* hook for top actors table */
    useEffect(() => {
        const fetchTopActors = async () => {
            try {
                const response = await fetch('/api/top-actors');
                if (!response.ok) {
                    throw new Error('Bad Network Response');
                }
                const data = await response.json();
                setTopActors(data);
            } catch (error) {
                console.error('Error fetching top actors:', error);
            } finally {
                setLoadingTopActors(false);
            }
        };

        fetchTopActors()
    }, []);

    if (loadingTopFilms) {return <p>Loading top films...</p>;}
    if (loadingTopActors) {return <p>Loading top actors...</p>;}

    return (
        <div className="container mt-4">


            {/* Top 5 Rented Films Table */}
            <h2 className="text-center">Top 5 Rented Films</h2>
            <table className="table table-striped table-hover" style={{cursor: 'pointer'}}>
                <thead>
                    <tr >
                        <th>Film Name</th>
                        <th className="text-center">Category Name</th>
                        <th className="text-center">Rental Count</th>
                    </tr>
                </thead>
                <tbody>
                    {topFilms.map((film) => (
                        <tr key={film.film_id} onClick={() => setSelectedFilmId(film.film_id)}>
                            <td>{film.title}</td>
                            <td className="text-center">{film.category_name}</td>
                            <td className="text-center">{film.rental_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Top 5 Actors */}
            <h2 className="text-center">Top 5 Actors</h2>
            <table className="table table-striped table-hover" style={{cursor: 'pointer'}}>
                <tbody>
                {topActors.map((actor) => (
                    <tr key={actor.actor_id} className="text-center" onClick={() => setSelectedActor(actor)}>
                        <td>{actor.actor_name} ({actor.rental_count} rentals)</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* If there is a selected actor show the details modal */}
            {selectedActor && (
                <ActorDetailsModal
                    actorId={selectedActor.actor_id}
                    actorName={selectedActor.actor_name}
                    onClose={() => setSelectedActor(null)}
                />
            )}

            {/* If there is a selected film show the details modal */}
            {selectedFilmId && (
                <FilmDetailsModal
                    filmId={selectedFilmId}
                    onClose={() => setSelectedFilmId(null)}
                />
            )}
        </div>
    );
}