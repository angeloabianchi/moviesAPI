import React, { useEffect, useState } from "react";
import './Movies.css';
// import GetMovies from '../../Components/Requests/GetMovies';


const Movies = () => {

    const fetch = require('node-fetch');

    const [movies, setMovies] = useState();
    const [page, setPage] = useState('1');

    const fetchData = () => {
        const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjljM2YwMjllM2Y4NGRjYTY3ZmVlM2U1YzNmN2NlMCIsInN1YiI6IjY0YjZhMmUzYWM0MTYxMDBmZjIxZjhjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YVq3uit-EzdsQ0Ot-fwHkvX03DUElXUuX2OpAu3R6vc'
            }
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return setMovies(json.results);
        })
        .catch(err => console.error('error:' + err));
    }
    
    useEffect(() => {
        fetchData();
    }, []);


    console.log('movies: ', movies);




    return (
        <div className="container">
            {movies && movies.map((movie) => (
                <div className="movieCard">
                    <div className="poster">
                        <img className="posterImg" src={`https://image.tmdb.org/t/p/original` + movie.poster_path} />
                    </div>
                    <div className="info">
                        <div className="upperBar">
                            <div><p className="releaseDate">{movie.release_date}</p></div>
                            <div><p className="title" key={movie.id}>{movie.original_title}</p></div>
                            <div className="vote">
                                <p className="average">{movie.vote_average}</p>
                                <p>({movie.vote_count} votes)</p>
                            </div>
                        </div>
                        <div className="movieInfo">
                            <p>{movie.overview}</p>
                            <div className="pop">
                                <p>Popularity: {movie.popularity}</p>
                                <p>Original Movie Language: {movie.original_language}</p>
                            </div>

                        </div>
                    </div>      
                </div>
                
            ))}
        </div>








/*         <div>
            {movies && movies.map((movie) => (
                <p key={movie.id}>{movie.original_title}</p>
            ))}
        </div> */
    );
};

export default Movies;