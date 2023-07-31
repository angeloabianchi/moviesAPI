import React from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import tvShowIcon from '../../static/images/tvShowIcon.gif'
import movieIcon from '../../static/images/movieIcon.gif'


const Home = () => {
    return (
        <div className="homeContainer">
            <div className="homeItems">
                <Link to="/movies" className="link">
                    <img className='movieIconImage' src={movieIcon} alt="Click here to find movies and more" />
                </Link>
            </div>
            <div className="homeItems">
                <Link to="/tvshow" className="link">
                    <img className='movieIconImage' src={tvShowIcon} alt="Click here to find tvShows and more" />
                </Link>
            </div>
        </div>
    )
}

export default Home;