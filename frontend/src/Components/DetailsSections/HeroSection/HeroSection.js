import React, {useState, useEffect} from "react";
import './HeroSection.css';
import ClipLoader from "react-spinners/ClipLoader";



const HeroSection = ( {movie} ) => {
    
    const [isLoading, setIsLoading] = useState(true);

    const loadImage = (url) => {
        const img = new Image();
        img.onload = () => {
            setIsLoading(false);
        };
        img.src = url;
    }


    useEffect(() => {
        if (movie.backdrop_path) {
            const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
            loadImage(imageUrl);
        }
        else {
            const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
            loadImage(imageUrl);
        }

    }, [movie.backdrop_path]);


    return (
        <div className="heroSectionContainer">
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
                <div className="detailsHeroTitle">{movie.original_title}</div>
                <a href={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} target="_blank">
                    <div className="detailsHeroSection"
                    onLoad={loadImage}
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        }}>
                        <div className="heroOverview">{movie.overview}</div>
                    </div>
                </a>

                </>
            )}

        </div>
        
    ); 
}

export default HeroSection;