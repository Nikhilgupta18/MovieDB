import React, { Component } from 'react'
import Quotes from './Quotes';

export default class HomePage extends Component {
    

    movies =  [];
      
    constructor(){
        super();
        this.state = {
            trendingMovies: this.movies,
            page: 1
        }
        console.log("hello world");
    }

    async componentDidMount(){
        let data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', this.props.options);
        let parseData  = await data.json();
        console.log(parseData);

        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page
                    
        });
                    
    }
    handlePrevClick = async ()=>{
        let data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.state.page - 1}`, this.options);
        let parseData  = await data.json();
        
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page - 1,
        })
        console.log(this.state.page);
        
    }

    handleNextClick = async ()=>{
        console.log(this.state.page);
        let data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.state.page + 1}`, this.options);
        let parseData  = await data.json();
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page + 1,
        })
        console.log(this.state.page);
        console.log(data, parseData,this.state.trendingMovies);

    }
  render() {
    return (
        <div className='container my-5'>
            <div>Latest Movies</div>
            <div className='row'>
                {this.state.trendingMovies.map((element)=>{
                    return <div key={element.id} className='col-3'>
                                <Quotes title={element.title} description={element.overview.slice(0, 200)} imageUrl={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} movieId={element.id}/>
                            </div>
                })}
                
            </div>
            <div className='row'>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page === 1?true:false} className='btn btn-primary' onClick={this.handlePrevClick}>Previous</button>
                    <button className='btn btn-primary' onClick={this.handleNextClick}>Next</button>
                </div>
            </div>
        </div>
    )
  }
}
