import React from "react";
import {useEffect, useState} from "react";

export default function Home() {
    const [topFilms, setTopFilms] = useState([]);
    const [loadingTopFilms, setLoadingTopFilms] = useState(true);

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
        <div>
            <h1>Landing Page</h1>
            <h2>Top 5 Rented Films</h2>
            <ul>
                {topFilms.map((film) => (
                    <li key={film.id}>{film.title}</li>
                ))}
            </ul>
        </div>
    );
}