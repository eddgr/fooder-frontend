import React from 'react'
import VenueContainer from './VenueContainer'

export default function MainContainer(props) {
    // HELPER FUNCTIONS
    const handleLogOut = () => {
      props.logOut()
      localStorage.clear()
    }
    // end HELPER FUNCTIONS

    return (
      <div className="m-4">
        <button onClick={() => handleLogOut()}>Log Out</button>
        <VenueContainer />
      </div>
    )
}
