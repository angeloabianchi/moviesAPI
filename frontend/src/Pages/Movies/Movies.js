import React, { useEffect, useState } from "react";
import './Movies.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useLocation } from 'react-router-dom';
import { fetchData } from "../../Components/FetchFunctions/fetchs";


const Movies = ({ searchInput, setSearchInput }) => {

    const [movies, setMovies] = useState();
    const [maxPage, setMaxPage] = useState(500)
    const [isLoading, setIsLoading] = useState(true);
    const [topRated, setTopRated] = useState(false);
    const currentLocation = useLocation();

    const [oldInput, setOldInput] = useState(() => {
        if (currentLocation.state.oldInput) {
            return currentLocation.state.oldInput
        }
        else {
            return '';
        }
    });

    const [page, setPage] = useState(() => {
        if (currentLocation.state.page) {
            return currentLocation.state.page;
        }
        else {
            return 1;
        }
    });

    const [apiRequest, setApiRequest] = useState(() => {
        if (currentLocation.state.apiRequest) {
            return currentLocation.state.apiRequest;
        }
        else {
            return 'popular';
        }
    });


    const pageChange = (event, selectedPage) => {
        setPage(selectedPage);
    };


    const inputButtons = buttonAction => {
        if (buttonAction === 'top_rated') {
            setTopRated(true);
            setPage(1);
            setApiRequest('popular');
        }
        
        if (buttonAction === 'popular') {
            setTopRated(false);
            setPage(1);
            setApiRequest('top_rated');
        }
    }


    const backToMovies = () => {
        setSearchInput('');
        setApiRequest('popular');
        setPage(1);
    }
    
    
    useEffect( () => {
        setMovies('');
        setIsLoading(true);
        if(searchInput) {
            setApiRequest('search');
            if (searchInput !== oldInput) {
                setOldInput(searchInput);
                setPage(1);
            }
        }

        setTimeout( async () => {
            const {results: data, total_pages: totalPages} = await (fetchData(apiRequest, {page: page, input: searchInput}));
            setMovies(data);
            setMaxPage(totalPages);
            setIsLoading(false);
        }, 1000);

    }, [page, searchInput, topRated, apiRequest]);



    return (
        <div className="container">
            <div className="pageInput">
                <Stack spacing={2}>
                    <Pagination sx={{
                            button: {
                                color: 'white',
                                fontSize: '1.2rem',
                                fontFamily: 'VT323, monospace',
                                backgroundColor: 'rgba(249,188,80, 0.5)',
                                '&:hover': {
                                    backgroundColor: 'rgba(249,188,80, 0.9)',
                                }
                            }}}
                    count={maxPage < 500 ? maxPage : 500} 
                    page={page} 
                    onChange={pageChange}
                    />
                </Stack>
                {!searchInput ? (
                    <button className="topRated"onClick={() => inputButtons(apiRequest)}>{apiRequest}</button>
                ) : (
                    <button className="topRated"onClick={() => backToMovies()}>Back to movies</button>
                )}
                
            </div>
            <div className="cardsZone">
                {isLoading ? (
                    <div className="loadingIcon">                
                        <ClipLoader
                        loading={isLoading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        color='white'
                        />
                    </div>
                ) : (    
                <>
                <div className="cards">
                    {(movies) && (movies).map((movie) => (
                        <Link to={"/movie/" + movie.id} state={{ from: currentLocation.pathname, page: page, apiRequest: apiRequest, oldInput: oldInput }} className="link">
                            <div className="movie">
                                <div className="movieCard" id={movie.id} 
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    opacity: '80%'
                                    }}>
                                    <div className="info">
                                        <div className="upperBar">
                                            <p className="rate">{movie.vote_average.toFixed(1)}</p>
                                            <p className="votes">({movie.vote_count} votes)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="pageInput">
                    <Stack spacing={2}>
                        <Pagination 
                        count={maxPage < 500 ? maxPage : 500} 
                        page={page} 
                        onChange={pageChange} 
                        />
                    </Stack>
                </div>
                </>
                )}
            </div>

        </div>
    );
};

export default Movies;