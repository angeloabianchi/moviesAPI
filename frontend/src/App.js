import React, {useState} from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Movies from './Pages/Movies/Movies';
import NavBar from './Components/NavBar/NavBar';
import Details from './Pages/Details/Details';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


const App = () => {

  const [searchInput, setSearchInput] = useState('');

  return(
    <Router>
      <div className="App">
        <div className="App-header">
          <header>
            <NavBar searchInput={searchInput} setSearchInput={setSearchInput}/>
          </header>
        </div>
        
        <div className="Content">
          <main>
            <Routes>
              {/* <Route path="/" exact ><Home /></Route> */}
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/movies" element={<Movies searchInput={searchInput} setSearchInput={setSearchInput} />} />
              <Route path="/movie/:id" element={<Details />} />
              {/* <Route path="/movies" render={props => <Movies/>}/> */}
              {/* <Navigate to="/" /> */}
            </Routes>
          </main>
        </div>

        <div className="footer"> </div>

      </div>
        
    </Router>
  );
}

export default App;
