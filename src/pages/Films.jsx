import React, { useState, useEffect } from "react";
import FilmDetailsModal from "../components/FilmDetailsModal";

export default function Films() {
    const [films, setFilms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedFilmId, setSelectedFilmId] = useState(null);

    // This function fetches data from your new Flask route
    const fetchFilms = async (query = "") => {
        setLoading(true);
        try {
            // If query is empty, it hits /api/films
            // If query is "rock", it hits /api/films?search=rock
            const url = query
                ? `/api/films?search=${encodeURIComponent(query)}`
                : '/api/films';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            setFilms(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial load (get first 50 films)
    useEffect(() => {
        fetchFilms();
    }, []);

    // Handle search form submit
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent page reload
        fetchFilms(searchTerm);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Film Library</h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a film..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Results Table */}
            {loading ? (
                <p>Loading films...</p>
            ) : (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release Year</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {films.map((film) => (
                        <tr key={film.film_id}>
                            <td>{film.title}</td>
                            <td>{film.release_year}</td>
                            <td>{film.rating}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-info"
                                    onClick={() => setSelectedFilmId(film.film_id)}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Reuse your existing Modal! */}
            {selectedFilmId && (
                <FilmDetailsModal
                    filmId={selectedFilmId}
                    onClose={() => setSelectedFilmId(null)}
                />
            )}
        </div>
    );
}