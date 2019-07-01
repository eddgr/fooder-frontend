import React from 'react'
import VenueContainer from './VenueContainer'

export default function MainContainer(props) {
    // HELPER FUNCTIONS
    const handleLogOut = () => {
      props.logOut()
      localStorage.token = ''
      localStorage.user_id = ''
    }
    // end HELPER FUNCTIONS

    return (
      <div>
        <button onClick={() => handleLogOut()}>Log Out</button>
        <VenueContainer />
      </div>
    )
}
