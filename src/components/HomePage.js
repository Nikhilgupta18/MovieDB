import React, { Component } from 'react'
import Quotes from './Quotes';

export default class HomePage extends Component {
    

    movies =  [];
      
    constructor(props){
        super(props);
        this.state = {
            trendingMovies: this.movies,
            page: 1,
            loading: false
        }
        console.log(this.props.url);
    }

    async componentDidMount(){
        this.props.setProgress(0);
        let data = await fetch(`https://api.themoviedb.org/3/movie/${this.props.url}?language=en-US&page=1`, this.props.options);
        this.setState({loading: true});
        let parseData  = await data.json();
        console.log(parseData);
        this.props.setProgress(30);

        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page,
            loading: false
                    
        });
        this.props.setProgress(100);
                    
    }
    handlePrevClick = async ()=>{
        let data = await fetch(`https://api.themoviedb.org/3/movie/${this.props.url}?language=en-US&page=${this.state.page - 1}`, this.options);
        this.props.setProgress(30);
        let parseData  = await data.json();
        this.setState({loading: true});
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page - 1,
            loading: false
        })
        console.log(this.state.page);
        this.props.setProgress(100);
        
    }

    handleNextClick = async ()=>{
        this.props.setProgress(0);
        console.log(this.state.page);
        let data = await fetch(`https://api.themoviedb.org/3/movie/${this.props.url}?language=en-US&page=${this.state.page + 1}`, this.options);
        this.props.setProgress(30);
        this.setState({loading: true});
        let parseData  = await data.json();
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page + 1,
            loading: false
        })
        console.log(data, parseData,this.state.trendingMovies);
        this.props.setProgress(100);

    }
  render() {
    return (
        <div className='container my-5'>
            <div><h1>Latest Movies</h1></div>
            <div className='row'>
                {!this.state.loading && this.state.trendingMovies.map((element)=>{
                    return <div key={element.id} className='col-md-3 col-sm-6'>
                                <Quotes title={element.title} description={element.overview.slice(0, 143)} imageUrl={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} movieId={element.id}/>
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