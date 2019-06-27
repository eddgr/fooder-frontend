import React from 'react'

import { Link } from 'react-router-dom'

export default function TabbedBar() {
  return (
    <div className="navbar bg-light fixed-bottom p-0">
      <div className="col-6 text-center">
        <Link to='/' className="nav-link text-dark"><i className="fas fa-home"></i></Link>
      </div>
      <div className="col-6 text-center">
        <Link to='/likes' className="nav-link text-dark"><i className="fas fa-heart"></i></Link>
      </div>
    </div>
  )
}
