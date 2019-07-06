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

  const chatNav = () => {
    return (
      <>
        <i onClick={() => handleGoBack()} className="fas fa-chevron-left"></i>

        <h1 id="venue" onClick={() => document.querySelector("#chat-box").scrollTo(0,0)}>
          {props.currentUser.selectedVenue.name.substring(0, 16)}
          {props.currentUser.selectedVenue.name.length > 16 ? "..." : null}
        </h1>

        <Link onClick={() => moreInfo()} to={`venues/${props.currentUser.selectedVenue.id}`}>
          <i className="fas fa-info-circle text-dark"></i>
        </Link>
      </>
    )
  }

  const searchIcon = () => {
    if (window.location.pathname === '/search' || window.location.pathname.includes('/venues/') ) {
      return <i onClick={() => window.history.go(-1)} className="fas fa-chevron-left" />
    }
    return <Link to="/search"><i className="fas fa-search text-dark"></i></Link>
  }

  const normNav = () => {
    return (
      <>
        {props.currentUser.id !== '' ? searchIcon() : null}

        <h1 id="logo" className="mx-auto" onClick={() => window.scrollTo(0,0)}>
          fooder
        </h1>

        {
          props.currentUser.selectedVenue.id === parseInt(window.location.pathname.replace(/\/venues\//, '')) ?
            <Link to="/chats"><i className="text-dark far fa-comments"></i></Link>
         :
            <Link to="/profile"><i className="far fa-user-circle text-dark"></i></Link>
        }
      </>
    )
  }

  return (
    <nav className="navbar fixed-top bg-light">
      {props.currentUser.inChat ? chatNav() : normNav()}
    </nav>
  )
}

export default withRouter(NavBar)
