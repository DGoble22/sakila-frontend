import React from "react";
import {useEffect, useState} from "react";
import FilmDetailsModal from "../components/FilmDetailsModal";

export default function Home() {
    const [topFilms, setTopFilms] = useState([]);
    const [loadingTopFilms, setLoadingTopFilms] = useState(true);
    const [selectedFilmId, setSelectedFilmId] = useState(null);

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

    if (loadingTopFilms) {return <p>Loading top films...</p>;}

    return (
        <div className="container mt-4">

            {/* Landing Page Header */}
            <h1 className="text-center">Landing Page</h1>

            {/* Top 5 Rented Films Table */}
            <h2>Top 5 Rented Films</h2>
            <table className="table table-striped table-hover" style={{cursor: 'pointer'}}>
                <thead>
                    <tr>
                        <th>Film Name</th>
                        <th>Category Name</th>
                        <th>Rental Count</th>
                    </tr>
                </thead>
                <tbody>
                    {topFilms.map((film) => (
                        <tr key={film.film_id} onClick={() => setSelectedFilmId(film.film_id)}>
                            <td>{film.title}</td>
                            <td>{film.category_name}</td>
                            <td>{film.rental_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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