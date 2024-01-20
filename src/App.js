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
   <NavBar title="MoviesDB" options={options} setProgress={setProgress} />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={4}
      />
      <Routes>
            <Route  path="/MovieDB/" element={<HomePage key="latest" options={options} setProgress={setProgress} type = {'movie'} url={'now_playing'} />}>
            </Route>
            <Route  path="/MovieDB/upcoming" element={<HomePage key="upcoming" options={options} setProgress={setProgress} type = {'movie'} url={'upcoming'}/>}>
            </Route>
            <Route  path="/MovieDB/top_rated" element={<HomePage key="top_rated" options={options} setProgress={setProgress} type = {'movie'} url={'top_rated'}/>}>
            </Route>
            <Route  path="/MovieDB/series/popular" element={<HomePage key="tv_popular" options={options} setProgress={setProgress} type = {'tv'} url={'popular'}/>}>
            </Route>
            <Route  path="/MovieDB/series/top_rated" element={<HomePage key="tv_top_rated" options={options} setProgress={setProgress} type = {'tv'} url={'top_rated'}/>}>
            </Route>
            <Route path="/MovieDB/movie/:id" element={<MovieDetail key="movie_detail" options={options} setProgress={setProgress}/>}>
            </Route>
            <Route path="/MovieDB/tv/:id" element={<MovieDetail key="tv_detail" options={options} setProgress={setProgress}/>}>
            </Route>
      </Routes>
    </Router>

   </>
  );
}

export default App;
