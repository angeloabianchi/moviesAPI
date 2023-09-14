import React, { useEffect, useState } from "react";
import './TvShow.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ClipLoader from "react-spinners/ClipLoader";
// import GetMovies from '../../Components/Requests/GetMovies';


const TvShow = ({ searchInput }) => {

    const fetch = require('node-fetch');

    const [tvShows, setTvShows] = useState();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500)
    const [isLoading, setIsLoading] = useState(true);

    

    const pageChange = (event, selectedPage) => {
        // if (movies == '') {
        //     setPage(1);
        // }
        // else {
        //     setPage(selectedPage);
        // }
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
            
            return setTvShows(json.results) || setMaxPage(json.total_pages) || setIsLoading(false);
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
    }, [page, searchInput]);


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
            </div>
            <div>
                {(tvShows) && (tvShows).map((tvShow) => (
                    <div className="movie">
                        <div className="movieCard">
                            <div className="poster">
                                <img className="posterImg" src={`https://image.tmdb.org/t/p/original` + tvShow.poster_path} />
                            </div>
                            <div className="info">
                                <div className="upperBar">
                                    <div><p className="title" key={tvShow.id}>{tvShow.title}</p></div>
                                    <div className="vote">
                                        <p className="average">{tvShow.vote_average.toFixed(1)}</p>
                                        <p>({tvShow.vote_count} votes)</p>
                                    </div>
                                </div>
                                <div className="movieInfo">
                                    <p>{tvShow.overview}</p>
                                    <div className="pop">
                                        <div>
                                            <p>Popularity: {tvShow.popularity}</p>
                                            <p>Original tvShow Language: {tvShow.original_language}</p>
                                        </div>
                                        <div>
                                            <p className="releaseDate">{tvShow.release_date}</p>
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

export default TvShow;