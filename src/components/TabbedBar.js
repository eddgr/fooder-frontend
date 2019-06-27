import React from 'react'

import { Link } from 'react-router-dom'

export default function TabbedBar() {
  return (
    <div className="navbar bg-light fixed-bottom">
      <div className="col-6 text-center">
        <Link to='/' className="nav-link text-dark"><i class="fas fa-home"></i></Link>
      </div>
      <div className="col-6 text-center">
        <Link to='/likes' className="nav-link text-dark"><i class="fas fa-heart"></i></Link>
      </div>
    </div>
  )
}
