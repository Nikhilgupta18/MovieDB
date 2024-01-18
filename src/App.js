import './App.css';
import React, { useState } from 'react'
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


function App() {
  const [progress, setProgress] = useState(0);

  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmNmZTVmYjc2NDFmNDI4MDI3ZTVkNDYxZjc5MDU0MiIsInN1YiI6IjVmNGZlM2I1ZGUxMWU1MDAzMzBlNTFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8HvDmPNDs-EGvGoWhsnGfkcY9n7s5ioN1Ob5G4ZNCbE'
    }
  };
  return (
   <>
    <Router>
   <NavBar title="MoviesDB"/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={4}
      />
      <Routes>
            <Route path="/MovieDB/" element={<HomePage options={options} setProgress={setProgress} url={'now_playing'}/>}>
            </Route>
            <Route path="/MovieDB/upcoming" element={<HomePage options={options} setProgress={setProgress} url={'upcoming'}/>}>
            </Route>
            <Route path="/MovieDB/movieDetail/:id" element={<MovieDetail options={options} setProgress={setProgress}/>}>
            </Route>
      </Routes>
    </Router>

   </>
  );
}

export default App;
