import React, {useState, useEffect} from "react";
import './Details.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


const Details = () => {

    const fetch = require('node-fetch');

    const { id } = useParams();
    const movieId =  id;

    const [movies, setMovies] = useState('');

    console.log('movieId - ' + movieId)


    const fetchData = (movieId) => {

        window.scrollTo(0, 0);
        
        let url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

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
            
            return setMovies(json);
        })
        .catch(err => console.error('error:' + err));
    }



    useEffect(() => {
        setTimeout(() => {
            fetchData(movieId);
        }, 1000);
    }, [movieId]);



    console.log('movies - ' + movies)



    return (
        <div> aaaaaaaaaaaaaaaaaaaaaaaaaaa
            <div>{movies.original_title}</div>
        </div>
        
    );

}

export default Details;