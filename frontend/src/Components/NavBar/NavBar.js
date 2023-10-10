import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import account from '../../static/images/account.png';
import logo from '../../static/images/logo.png'


const NavBar = ({ searchInput, setSearchInput }) => {

    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchInput(input);
        navigate('/movies', { state: { from: location.pathname, page: location.state.page } } );
    };

    const cleanInput = () => {
        setSearchInput('');
    }

      useEffect(() => {
        if(searchInput) {
            setInput('');
        }
      }, [searchInput]);



    return (
        // <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className='navBar'>
            <div className='navItems'>
                <Link to="/" className="logo" onClick={cleanInput}>
                    <img className='logoImage' src={logo} alt="logo icon" />
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
                <a href="#">
                    <span className='login'>Log In</span>
                </a>
            </div>
        </div>
    );
}

export default NavBar;