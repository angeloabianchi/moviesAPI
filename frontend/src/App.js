import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Movies from './Pages/Movies/Movies';
import NavBar from './Components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';


const App = () => {

  return(
    <Router>
      <div className="App">
        <div className="App-header">
          <header>
            <NavBar />
          </header>
        </div>
        
        <div className="Content">
          <main>
            <Routes>
              {/* <Route path="/" exact ><Home /></Route> */}
              <Route exact path="/" element={<Home />} />
              <Route path="/movies" element={ <Movies />}/>
              {/* <Route path="/movies" render={props => <Movies />}/> */}
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
