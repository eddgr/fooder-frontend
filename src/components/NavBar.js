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
          <i onClick={() => handleGoBack()} className="fas fa-chevron-left"></i>
        :
          <i className="fas fa-search"></i>
      }
      <b onClick={() => window.scrollTo(0,0)}>
        {
          props.currentUser.inChat ?
            props.currentUser.selectedVenue.name
          :
            "fulfilld"
        }
      </b>
      {props.currentUser.username}
    </nav>
  )
}
