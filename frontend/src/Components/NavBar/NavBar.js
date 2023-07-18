import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import github from '../../static/images/github.png';
import logo from '../../static/images/logo.png'


const NavBar = () => {
    return (
        // <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <nav>
            <div className='navItems'>
                <Link to="/" className="logo">
                    <img className='logoImage' src={logo} alt="github icon" />
                </Link>
            </div>
            <div className='navItems'>
                <form class="form">
                    <input type="text" placeholder="Find a movie" class="input-movie"/>
                    <button to="submit" className="submitButton">
                        SUBMIT
                        {/* <img className='socialMidiaIconImage' src={movie} alt="github icon" /> */}
                    </button>

                </form>

            </div>
            <div className="navItems">
                <a href="https://github.com/angeloabianchi">
                    <img className='socialMidiaIcon' src={github} alt="github icon" />
                </a>
            </div>
        </nav>
    );
}

export default NavBar;