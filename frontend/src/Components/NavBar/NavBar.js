import React, { useState } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import github from '../../static/images/github.png';
import logo from '../../static/images/logo.png'


const NavBar = ({ onSubmit }) => {

    const [input, setInput] = useState('');
    const history = useNavigate();

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(input);
        history('/movies');
    };

    return (
        // <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className='navBar'>
            <div className='navItems'>
                <Link to="/" className="logo">
                    <img className='logoImage' src={logo} alt="github icon" />
                </Link>
            </div>
            <div className='navItems'>
                <form class="form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Find a movie" class="input-movie" value={input} onChange={handleInputChange}/>
                    <button type="submit" className="submitButton">
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
        </div>
    );
}

export default NavBar;