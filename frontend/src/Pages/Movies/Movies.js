import React from "react";
import './Movies.css';

const Movies = () => {
<<<<<<< HEAD

    const fetch = require('node-fetch');

    const [movies, setMovies] = useState();
    const [page, setPage] = useState('1');

    const fetchData = () => {
        const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'API KEY'
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
            <div className="page"></div>
            <div>
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

=======
    return (
        <div>
            <p>This is the MOVIES page</p>
>>>>>>> parent of f814cdd (consuming and rendering the movie api)
        </div>
    )
}

export default Movies;