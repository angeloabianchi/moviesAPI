import React, {useState, useEffect} from "react";
import './HeroSection.css';
import ClipLoader from "react-spinners/ClipLoader";



const HeroSection = ( {movie, credits, videos, release_dates, streamings} ) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const prefix = 'https://image.tmdb.org/t/p/original';
    const genres = movie.genres;

    /* console.log(streamings.results); */


    const findCertification = (releaseDatesData) => {
        for (const key in releaseDatesData) {
            if (typeof releaseDatesData[key] === 'object') {
              const releaseDates = findCertification(releaseDatesData[key]);
              if (releaseDates !== '') {
                return releaseDates;
              }
            } else if (key === 'certification' && /^\d+$/.test(releaseDatesData[key])) {
              return releaseDatesData[key];
            }
          }
          return '';
    }


    const minToHours = (min) => {
        const hours = Math.floor(min / 60);
        const remainingMinutes = min % 60;
        return `${hours}h${remainingMinutes}m`;
    }


    const findDirector = (crew) => {

        for (const person in crew) {
            if (crew[person].department === 'Directing') {
                return crew[person].name;
            }
        }
        return '';
    }

    const findStreamings = (streaming) => {
        const images = [];
        const link = [];
        for (const language in streaming) {
            if(language === 'US') {
                link.push(streaming[language].link)

                for (const channel in streaming[language].flatrate) {
                    images.push(streaming[language].flatrate[channel].logo_path)
                }
            }
        }
        /* console.log(channelLink, channelsImages); */

        return {link, images};
    }


    const loadImage = (url) => {
        const img = new Image();
        img.onload = () => {
            setIsLoading(false);
        };
        img.src = url;
    }


    useEffect(() => {
        setTimeout( () => {
            if (movie.backdrop_path) {
                const imageUrl = `${prefix}${movie.backdrop_path}`;
                loadImage(imageUrl);
            }
            else {
                const imageUrl = `${prefix}${movie.poster_path}`;
                loadImage(imageUrl);
            }
        }, 1000);


    }, [movie.backdrop_path]);
    
    const certification = findCertification(release_dates.results);
    const runtime = minToHours(movie.runtime);
    const director = findDirector(credits.crew);
    const channelInfo = findStreamings(streamings.results);

    /* console.log(channelInfo.images[0]); */
    /* console.log(streamings.results) */

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
                <a href={`${prefix}${movie.backdrop_path}`} target="_blank">
                    <div className="detailsHeroSection"
                    onLoad={loadImage}
                    style={{
                        backgroundImage: `url(${prefix}${movie.backdrop_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        }}>
                        <div className="detailsHeroTitleZone">
                            <div className="detailsHeroTitle">
                                <span className="movieTitle">
                                    {movie.original_title}
                                </span>
                                <span>
                                    ({new Date(movie.release_date).getFullYear()})
                                </span>
                            </div>
                            <div className="movieDetails">
                                <div className="certificationInfo">
                                    {certification ? (
                                        <><div className="certification">{certification}</div></>
                                    ) : (
                                        <><div className="noCertification"></div></>
                                    )}
                                    
                                </div>
                                <div className="genresSection">
                                    <p>{movie.release_date}</p>
                                    <p className="genres">
                                        {genres.map((item) => (
                                            <span>{item.name}</span>
                                        ))}
                                    </p>
                                    <p>{runtime}</p>
                                </div>
                            </div>
                        </div>
                        <div className="heroOverviewZone">
                            <div className="heroOverview">{movie.overview}</div>
                        </div>
                        <div className="heroFooterZone">
                            <div className="heroCredits">
                                <p className="heroDirector">{director}</p>
                                <p>Director</p>
                            </div>
                            <div className="heroStreamingZone">
                                <a className="channelLinks" href={channelInfo.link} target="_blank">
                                    {(channelInfo.images) && (channelInfo.images).map((image) => (
                                        <div className="streamingCard">
                                            <img src={`https://image.tmdb.org/t/p/original${image}`} />
                                        </div>
                                    ))}
                                </a>

                            </div>
                        </div>
                    </div>
                </a>
                </>
            )}

        </div>
        
    ); 
}

export default HeroSection;