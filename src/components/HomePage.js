import React, { Component } from 'react'
import Quotes from './Quotes';

export default class HomePage extends Component {
    

    movies =  [];
      
    constructor(props){
        super(props);
        this.props.setProgress(10);
        this.state = {
            trendingMovies: this.movies,
            page: 1,
            search: ""
        }
    }

    async componentDidMount(){
        this.props.setProgress(10);
        let data = await fetch(`https://api.themoviedb.org/3/${this.props.type}/${this.props.url}?language=en-US&page=1`, this.props.options);
        let parseData  = await data.json();
        this.props.setProgress(30);
        
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page,
            search: this.state.search
            
        });
        this.props.setProgress(100);
        
    }
    
    // async componentDidUpdate(){
        
    //     console.log(this.props.search);
    //     if(this.props.search && this.props.search.length > 0){
    //         console.log("hello world")
    //         let data = await fetch(`https://api.themoviedb.org/3/search/${this.props.type}?query=${this.props.search}`, this.props.options);
    //         let parseData = await data.json();
    //         console.log(parseData);
    //         this.setState({
    //             trendingMovies: parseData.results,
    //             page: this.state.page
    //         })
    //     }
        
    // }



    handlePrevClick = async ()=>{
        let data = await fetch(`https://api.themoviedb.org/3/${this.props.type}/${this.props.url}?language=en-US&page=${this.state.page - 1}`, this.props.options);
        this.props.setProgress(30);
        let parseData  = await data.json();
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page - 1,
            search: this.state.search
        })
        this.props.setProgress(100);
        
    }

    handleNextClick = async ()=>{
        this.props.setProgress(10);
        let data = await fetch(`https://api.themoviedb.org/3/${this.props.type}/${this.props.url}?language=en-US&page=${this.state.page + 1}`, this.props.options);
        this.props.setProgress(30);
        let parseData  = await data.json();
        this.setState({
            trendingMovies: parseData.results,
            page: this.state.page + 1,
            search: this.state.search
        })

        this.props.setProgress(100);

    }

    titleCase = (str) =>{
        var splitStr = str.toLowerCase().split(/[ _]/);
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
     }


     handlesearch = async (value) =>{
        
        let data = await fetch(`https://api.themoviedb.org/3/${this.props.type}/${this.props.url}?language=en-US&page=1`, this.props.options);
        if(value && value.length > 0){
            data = await fetch(`https://api.themoviedb.org/3/search/${this.props.type}?query=${value}`, this.props.options);
        }
        

        let parseData = await data.json();
        this.setState({
            trendingMovies: parseData.results,
            page: 1,
            search: value
        })

      }





  render() {
    return (
        <div className='container my-5'>
            <div className='text-center'>
                <h1>{this.titleCase(this.props.url)} {this.props.type === 'movie'? 'Movies' : 'Series'}</h1>
            </div>
            <input className="form-control me-2 mb-2" type="search" placeholder="search...." aria-label="Search" id="search"  onChange={(e) => this.handlesearch(e.target.value)}/>
            <div className='row '>
                {this.state.trendingMovies.map((element)=>{
                    return <div key={element.id} className='col-md-3 col-sm-6 d-flex justify-content-evenly'>
                                <Quotes key = {element.id}  title={element.title || element.name} description={element.overview.slice(0, 143)} imageUrl={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} movieId={element.id} type={this.props.type}/>
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
