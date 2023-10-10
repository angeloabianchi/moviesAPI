import React, {useState, useEffect} from "react";
import './Details.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '../../Components/DetailsSections/HeroSection/HeroSection';
import VideosSection from '../../Components/DetailsSections/VideosSection/VideosSection';
import { fetchData } from "../../Components/FetchFunctions/fetchs";


const Details = () => {

    const { id } = useParams();
    const movieId =  id;
    const location = useLocation();
    const navigate = useNavigate();
    const fetch = require('node-fetch');
    const [movie, setMovie] = useState('');
    const apiRequest = 'movie';

    console.log('details');
    console.log(location);
  
    const goBack = () => {
      // Use the navigate function with the location state to go back to the previous page
      if (location.state) {
        navigate(location.state.from, { state: { from: location.pathname, page: location.state.page, apiRequest: location.state.apiRequest, oldInput: location.state.oldInput } });

      } else {
        // If there's no specific "from" location, go back to the home page or a default route
        navigate('/movies');
      }
    };


  useEffect( () => {
    const getData = async () => {
      const data = await (fetchData(apiRequest, {id: movieId}));
      setMovie(data);
    }

    getData();

}, [movieId]);


    return (
        <div className="detailsContainer">
            <button className="goBackButton" onClick={goBack}>Go back</button>
            <div className="detailsHero"><HeroSection movie={movie}/></div>
            <div className="detailsVideos"><VideosSection movie={movie}/></div>
        </div>
    );

}

export default Details;