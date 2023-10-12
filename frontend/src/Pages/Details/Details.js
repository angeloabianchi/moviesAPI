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
    const [movie, setMovie] = useState('');
    const [credits, setCredits] = useState('');
    const [videos, setVideos] = useState('');
    const [releaseDates, setReleaseDates] = useState('');
    const [streamings, setStreamings] = useState('');
    const apiRequest = ['movie', 'credits', 'videos', 'release_dates', 'watch'];

  
    const goBack = () => {
      // Use the navigate function with the location state to go back to the previous page
      if (location.state) {
        navigate(location.state.from, { state: { from: location.pathname, page: location.state.page, apiRequest: location.state.apiRequest, oldInput: location.state.oldInput } });

      } else {
        // If there's no specific "from" location, go back to the home page or a default route
        navigate('/movies');
      }
    };


    useEffect(() => {
      const getData = async () => {
        for (const apiType of apiRequest) {
          try {
            const data = await fetchData(apiType, { id: movieId });
            if (apiType === 'movie') {
              setMovie(data);
            } else if (apiType === 'credits') {
              setCredits(data);
            } else if (apiType === 'videos') {
              setVideos(data);
            } else if (apiType === 'release_dates') {
              setReleaseDates(data);
            } else if (apiType === 'watch') {
              setStreamings(data);
            }
          } catch (error) {
            console.error(`Error fetching ${apiType} data:`, error);
          }
        }
      }
    
      getData();
    }, [movieId]);



    return (
        <div className="detailsContainer">
            <button className="goBackButton" onClick={goBack}>Go back</button>
            <div className="detailsHero"><HeroSection movie={movie} credits={credits} release_dates={releaseDates} streamings={streamings}/></div>
            <div className="detailsVideos"><VideosSection movie={movie}/></div>
        </div>
    );

}

export default Details;