import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  const handleGoBack = () => {
    window.history.go(-1)
    props.notInChat()
  }

  const moreInfo = () => {
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
            <Link onClick={() => moreInfo()} to={`venues/${props.currentUser.selectedVenue.id}`}>
              <i className="fas fa-info-circle text-dark"></i>
            </Link>
          </>
        :
          <>
            {props.currentUser.id !== '' ? <i className="fas fa-search"></i> : null}
            <b onClick={() => window.scrollTo(0,0)}>
              fooder
            </b>
            {
              props.currentUser.selectedVenue.id === parseInt(window.location.pathname.replace(/\/venues\//, '')) ?
               <Link to="/chats"><i className="text-dark far fa-comments"></i></Link>
             :
                props.currentUser.username
            }
          </>
      }
    </nav>
  )
}
