import React, { Component } from 'react'
import Quotes from './Quotes';

export default class HomePage extends Component {
    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmNmZTVmYjc2NDFmNDI4MDI3ZTVkNDYxZjc5MDU0MiIsInN1YiI6IjVmNGZlM2I1ZGUxMWU1MDAzMzBlNTFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8HvDmPNDs-EGvGoWhsnGfkcY9n7s5ioN1Ob5G4ZNCbE'
        }
      };

      movies =  [];
      
    constructor(){
        super();
        this.state = {
            trendingMovies: this.movies
        }
        console.log("hello world");
    }

    async componentDidMount(){
        let data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', this.options);
        let parseData  = await data.json();
        console.log(parseData);

        this.setState({
            trendingMovies: parseData.results,
                    
        });
                    
    }
  render() {
    return (
        <div className='container'>
            <div>Trending Movies</div>
            <div className='row'>
                {this.state.trendingMovies.map((element)=>{
                    return <div key={element.id} className='col-4'>
                                <Quotes title={element.title} description={element.overview.slice(0, 200)} imageUrl={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}/>
                            </div>
                })}
                
            </div>
        </div>
    )
  }
}
