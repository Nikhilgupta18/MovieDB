import React, { Component } from 'react'


export default class MovieDetail extends Component {
    // movieId = 1;
    constructor(){
        super();
        this.state = {
            movieId: 1,
            movieDetail: [],
            loading: false
        }
        
    }
    
    async componentDidMount(){
        const movieDetailsUrls = window.location.href.split('/');
        this.props.setProgress(10);
        let data = await fetch(`https://api.themoviedb.org/3/movie/${movieDetailsUrls[movieDetailsUrls.length - 1]}?language=en-US&page=1`, this.props.options);
        this.setState({loading: true})
        let parseData  = await data.json();
        this.props.setProgress(30);
        this.setState({
            movieId : movieDetailsUrls[movieDetailsUrls.length - 1],
            movieDetail: parseData,
            loading: false
        });
        this.props.setProgress(100);

     }
  render() {
    
    return (
      <div className='container d-flex justify-content-center bg-dark text-white my-5'>
        <div className='my-5 d-flex justify-content-center'>
                <img src={`https://image.tmdb.org/t/p/w500/${this.state.movieDetail.poster_path}`} className="card-img-top rounded-4 border border-warning" alt="..." style={{width: "18rem", height:"30rem"}}/>
            <div className="card-body mx-5">
                <h1 className="card-title">{this.state.movieDetail.title}</h1>
                <p className="card-text fst-italic">"{this.state.movieDetail.tagline}"</p>
                <p className="card-text m-0">Status: {this.state.movieDetail.status}</p>
                <p className="card-text">Release Date: {this.state.movieDetail.release_date}</p>
                <p className="card-text my-5">{this.state.movieDetail.overview}</p>
                <a className="btn btn-warning  col-5" href={`https://www.imdb.com/title/${this.state.movieDetail.imdb_id}`} target='_blank' rel="noreferrer">Go To IMDB</a>
            </div>
        </div>


      </div>
    )
  }
}
