import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        // <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <nav>
            <div className="socialMediaArea">
                <a className="socialMediaIcon" href="http://www.google.com"><img src="#" alt="facebook ICON" /></a>
                <a className="socialMediaIcon" href="http://www.google.com"><img src="#" alt="instagram ICON" /></a>
                {/* <a className="socialMediaIcon" href="http://www.google.com"><img src={linkedinIcon} alt="linkedin ICON" /></a> */}

            </div>
        </nav>
    );
}

export default NavBar;