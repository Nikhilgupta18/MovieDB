import './App.css';
import HomePage from './components/HomePage';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
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
      <Routes>
            <Route path="/MovieDB/" element={<HomePage options={options}/>}>
            </Route>
            <Route path="/movieDetail/:id" element={<MovieDetail options={options}/>}>
            </Route>
      </Routes>
    </Router>

   </>
  );
}

export default App;
