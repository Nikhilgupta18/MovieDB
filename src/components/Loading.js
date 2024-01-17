import React, { Component } from 'react'
import loading from './XOsX.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center ' >
        <img src={loading} alt='loading'></img>
      </div>
    )
  }
}
