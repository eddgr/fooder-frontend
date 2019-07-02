import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  const handleGoBack = () => {
    window.history.go(-1)
    props.notInChat()
  }

  return (
    <nav className="navbar fixed-top bg-light">
      {
        props.currentUser.inChat ?
          <>
            <i onClick={() => handleGoBack()} className="fas fa-chevron-left"></i>
            <b onClick={() => document.querySelector("#chat-box").scrollTo(0,0)}>
              {props.currentUser.selectedVenue.name}
            </b>
            <Link to={`venues/${props.currentUser.selectedVenue.id}`}>
              <i className="fas fa-info-circle"></i>
            </Link>
          </>
        :
          <>
            <i className="fas fa-search"></i>
            <b onClick={() => window.scrollTo(0,0)}>
              fooder
            </b>
            {props.currentUser.username}
          </>
      }
    </nav>
  )
}
