import React, { Component } from 'react'


export default class MovieDetail extends Component {
    // movieId = 1;
    constructor(){
        super();
        this.state = {
            movieId: 1,
            movieDetail: [],
            castData: [],
            providers: [],
            loading: false
        }
        
    }
    
    async componentDidMount(){
        const movieDetailsUrls = window.location.href.split('/');
        let id = movieDetailsUrls[movieDetailsUrls.length - 1];
        let type = movieDetailsUrls[movieDetailsUrls.length - 2]
        this.props.setProgress(10);
        try{
          let data = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US&page=1`, this.props.options);
          let castData = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US&page=1`, this.props.options);
          let providers = await fetch(`https://api.themoviedb.org/3/${type}/${id}/watch/providers`, this.props.options);
          this.props.setProgress(30);
          
          
          let parseData  = await data.json();
          let castDataParsed = await castData.json();
          this.props.setProgress(60);
          let providersData = await providers.json();

          // console.log(castDataParsed);

          this.setState({
              movieId : id,
              type: type,
              movieDetail: parseData,
              castData: castDataParsed.cast.slice(0,5),
              providers: providersData.results.IN ? providersData.results.IN: providersData.results.US ? providersData.results.US : Object.values(providersData.results)[0],
              loading: false
          });
          this.props.setProgress(100);


        }          
        
        catch(e){
          console.log(e)
        }
          
        

     }
  render() {
    
    return (
      <div className='container d-flex justify-content-center bg-dark text-white my-5'>
        <div className='my-5 justify-content-center row'>
            <img src={`https://image.tmdb.org/t/p/w500/${this.state.movieDetail.poster_path}`} className="card-img-top rounded-4 border border-warning ms-2 p-0" alt="..." style={{width: "18rem", height:"30rem"}}/>
            <div className="card-body ms-5 col-md-7">
              <div className='d-flex'>
                <div className='col-md-5'>

                  <h1 className="card-title">{this.state.movieDetail.title || this.state.movieDetail.name}</h1>
                  <p className="card-text fst-italic">"{this.state.movieDetail.tagline}"</p>
                </div>
                  {this.state.providers?.flatrate?.slice(0,5).map((element)=>{
                    return <div className='me-2 ms-2'>
                              <img src={`https://image.tmdb.org/t/p/w500/${element.logo_path}`} alt='...' style={{width: "60px", height: "60px"}} className='me-1' data-bs-toggle="tooltip" data-bs-placement="bottom" title={element.provider_name}/>
                              <p className='fs-6 fw-lighter'>{element.provider_name}</p>
                            </div>
                  })}
              </div>
                <p className="card-text mt-5 m-0">Status: {this.state.movieDetail.status}</p>
                <p className="card-text">Release Date: {this.state.movieDetail.release_date || this.state.movieDetail.first_air_date}</p>
                <div className='container row d-flex'>
                  <h4>Starring:</h4>
                    {this.state.castData.map((element)=>{
                        return <div className='col-md-2 text-center my-2' key={element.id}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${element.profile_path}`} className="card-img-top align-items-center" alt="..." style={{width: "100px"}}/><br/>
                                    <span className="fw-lighter" >{element.character}</span><br/>
                                    <span className="" >{element.name}</span>
                                </div>
                                
                    })}
                    
                </div>
                <p className="card-text my-5 me-3">{this.state.movieDetail.overview}</p>
               {this.state.type === 'movie' ? <a className="btn btn-warning  col-5" href={`https://www.imdb.com/title/${this.state.movieDetail.imdb_id}`} target='_blank' rel="noreferrer">Go To IMDB</a> : ""} 
              </div>
        </div>


      </div>
    )
  }
}
