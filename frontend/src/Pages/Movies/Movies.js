import React, { useEffect, useState } from "react";
import './Movies.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ClipLoader from "react-spinners/ClipLoader";
// import GetMovies from '../../Components/Requests/GetMovies';


const Movies = ({ searchInput }) => {

    const fetch = require('node-fetch');

    const [movies, setMovies] = useState();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const pageChange = (event, selectedPage) => {
        setPage(selectedPage);
    };

    const fetchData = (page, input) => {
        
        let url = '';
        
        if (input === '') {
            url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
        }
        else {
            url = `https://api.themoviedb.org/3/search/movie?query=${input}&page=${page}`;
        }

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
            
            return setMovies(json.results) || setIsLoading(false);
        })
        .catch(err => console.error('error:' + err));
    }
    
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetchData(page, searchInput);
        }, 300);
    }, [page, searchInput]);


    return (
        <div className="container">
            <div className="pageInput">
                <Stack spacing={2}>
                    <Pagination count={500} page={page} onChange={pageChange} />
                </Stack>
            </div>
            {isLoading ? (
                <div className="loadingIcon">                
                    <ClipLoader
                    loading={isLoading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                </div>
            ) : (    
            <>
            <div>
                {movies && movies.map((movie) => (
                    <div className="movie">
                        <div className="movieCard">
                            <div className="poster">
                                <img className="posterImg" src={`https://image.tmdb.org/t/p/original` + movie.poster_path} />
                            </div>
                            <div className="info">
                                <div className="upperBar">
                                    <div><p className="title" key={movie.id}>{movie.title}</p></div>
                                    <div className="vote">
                                        <p className="average">{movie.vote_average}</p>
                                        <p>({movie.vote_count} votes)</p>
                                    </div>
                                </div>
                                <div className="movieInfo">
                                    <p>{movie.overview}</p>
                                    <div className="pop">
                                        <div>
                                            <p>Popularity: {movie.popularity}</p>
                                            <p>Original Movie Language: {movie.original_language}</p>
                                        </div>
                                        <div>
                                            <p className="releaseDate">{movie.release_date}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                ))}
            </div>
            <div className="pageInput">
                <Stack spacing={2}>
                    <Pagination count={500} defaultPage={1} page={page} onChange={pageChange} />
                </Stack>
            </div>
            </>
            )}
        </div>








/*         <div>
            {movies && movies.map((movie) => (
                <p key={movie.id}>{movie.original_title}</p>
            ))}
        </div> */
    );
};

export default Movies;