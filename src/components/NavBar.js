import React from 'react'

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
            <i className="fas fa-info-circle"></i>
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
