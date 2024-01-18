import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary "  data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/MovieDB/">{this.props.title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/MovieDB/">Latest</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/MovieDB/upcoming">Upcoming</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/MovieDB/top_rated">Top Rated</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/MovieDB/series/popular">Popular Series</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/MovieDB/series/top_rated">Top Series</Link>
              </li>
              
              
              
            </ul>
            
          </div>
        </div>
      </nav>
    )
  }
}
