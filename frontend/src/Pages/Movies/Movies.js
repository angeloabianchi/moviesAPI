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
    const [maxPage, setMaxPage] = useState(500)
    const [isLoading, setIsLoading] = useState(true);
    const [topRated, setTopRated] = useState(false);
    const [popular, setPopular] = useState(false);
    const [buttonText, setButtonText] = useState('Top Rated Movies');


    

    const pageChange = (event, selectedPage) => {
        // if (movies == '') {
        //     setPage(1);
        // }
        // else {
        //     setPage(selectedPage);
        // }
        setPage(selectedPage);
    };

    const inputButtons = buttonAction => {
        if (buttonAction === 'Top Rated Movies') {
            setTopRated(true);
            setPopular(false);
            setPage(1);
        }
        
        if (buttonAction === 'Popular Movies') {
            setPopular(true);
            setTopRated(false);
            setPage(1);
        }
    }


    const fetchData = (page, input) => {
        
        let url = '';
        
        if (input === '') {
            if (topRated || popular) {
                if (topRated) {
                    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`
                    console.log('1 - topRated')
                    setButtonText('Popular Movies')
                }
                if (popular) {
                    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
                    console.log('2 - popular')
                    setButtonText('Top Rated Movies')
                }
            }
            else {
                url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
                console.log('3 - Link normal')
            }

        }
        else {
            url = `https://api.themoviedb.org/3/search/movie?query=${input}&page=${page}`;
            console.log('4 - Input')
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
            
            return setMovies(json.results) || setMaxPage(json.total_pages) || setIsLoading(false);
        })
        .catch(err => console.error('error:' + err));
    }

    useEffect(() => {
        setPage(1);
    }, [searchInput]);
    
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetchData(page, searchInput);
        }, 1000);
    }, [page, searchInput, topRated, popular]);


    return (
        <div className="container">
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
            <div className="pageInput">
                <Stack spacing={2}>
                    <Pagination count={maxPage < 500 ? maxPage : 500} page={page} onChange={pageChange} />
                </Stack>
                <button onClick={() => inputButtons(buttonText)}>{buttonText}</button>
            </div>
            <div>
                {(movies) && (movies).map((movie) => (
                    <div className="movie">
                        <div className="movieCard" id={movie.id}>
                            <div className="poster">
                                <img className="posterImg" src={`https://image.tmdb.org/t/p/original` + movie.poster_path} />
                            </div>
                            <div className="info">
                                <div className="upperBar">
                                    <div><p className="title" key={movie.id}>{movie.title}</p></div>
                                    <div className="vote">
                                        <p className="average">{movie.vote_average.toFixed(1)}</p>
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
                    <Pagination count={maxPage < 500 ? maxPage : 500} page={page} onChange={pageChange} />
                </Stack>
            </div>
            </>
            )}
        </div>
    );
};

export default Movies;