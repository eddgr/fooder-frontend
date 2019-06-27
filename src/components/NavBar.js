import React from 'react'

import { Link } from 'react-router-dom'

export default function NavBar(props) {
  return (
    <nav className="navbar fixed-top bg-light">
      Search
      <b onClick={() => window.scrollTo(0,0)}>fulfilld</b>
      {props.currentUser.username}
    </nav>
  )
}
