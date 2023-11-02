import React, { useState, useEffect } from "react";
import './Home.css';
import { Link, useLocation } from 'react-router-dom';
import heroImage from '../../static/images/hero2.png';
import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {

    const [loading, setLoading] = useState(true);
    const currentLocation = useLocation();

    useEffect(() => {
        // Preload the image
        const img = new Image();
        img.src = heroImage;
        img.onload = () => {
            setLoading(false);
        };
        return () => {
            img.onload = null; // Clear the image load event handler
        };   
    }, []);

    
    return (
        <div className="heroSection">
            {loading ? (
                <div className="loadingIcon">                
                    <ClipLoader
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color='white'
                    />
                </div>
            ) : (
                <>
                    <div className="heroRight"> 
                        <h1 className="heroTitle">Get information about movies and Tv Shows! </h1>
                        <p className="heroText">I'm looking for a </p>
                        <div className="callToActionZone">
                            <div className="ctaButtons">
                                <Link to="/movies" state={{ from: currentLocation.pathname, page: null }} className="link">
                                    <span className="neon">
                                        M
                                        <span className="blinkingNeonMovie">O</span>
                                        VIE
                                    </span>
                                </Link>
                            </div>
                            <div className="ctaButtonsDisabled">
                                <Link to="/tvshow" className="link" disabled>
                                    <span className="neonDisabled">
                                        TVS
                                        <span className="blinkingNeonTv">H</span>
                                        OW
                                    </span> 
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="heroLeft">
                        <img className='heroImage' src={heroImage} alt="Click here to find movies and more" />
                    </div>
                </>

            )}

            
        </div>
    )
}

export default Home;