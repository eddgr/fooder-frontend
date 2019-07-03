import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function NavBar(props) {
  const handleGoBack = () => {
    props.history.push('/likes')
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
            <h1 id="venue" onClick={() => document.querySelector("#chat-box").scrollTo(0,0)}>
              {props.currentUser.selectedVenue.name}
            </h1>
            <Link onClick={() => moreInfo()} to={`venues/${props.currentUser.selectedVenue.id}`}>
              <i className="fas fa-info-circle text-dark"></i>
            </Link>
          </>
        :
          <>
            {props.currentUser.id !== '' ? <i className="fas fa-search"></i> : null}
            <h1 id="logo" className="mx-auto" onClick={() => window.scrollTo(0,0)}>
              fooder
            </h1>
            {
              props.currentUser.selectedVenue.id === parseInt(window.location.pathname.replace(/\/venues\//, '')) ?
                <Link to="/chats"><i className="text-dark far fa-comments"></i></Link>
             :
                <Link to="/profile">{props.currentUser.username}</Link>
            }
          </>
      }
    </nav>
  )
}

export default withRouter(NavBar)
