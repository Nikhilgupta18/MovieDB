import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Quotes extends Component {
    // handleMovieDetail = async ()=>{
        
    // }

 
 
  render() {
    return (
        <div className="card my-2" style={{width: "20rem", height: "50rem"}}>
            <img src={this.props.imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                <p className="card-text">{this.props.description.length === 200 ? this.props.description + "...." :  this.props.description}</p>
           
            </div>
            <div className='d-flex justify-content-center my-2'>
                <Link to={`/MovieDB/movieDetail/${this.props.movieId}`} className="btn btn-warning  col-5" >Movie Details</Link>
            </div>
        </div>
    )
  }
}
