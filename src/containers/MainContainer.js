import React from 'react'
import VenueContainer from './VenueContainer'

import Cards, { Card } from 'react-swipe-card'

export default function MainContainer(props) {
    // HELPER FUNCTIONS
    const handleLogOut = () => {
      props.logOut()
      localStorage.clear()
    }
    // end HELPER FUNCTIONS

    return (
      <div>
        <button onClick={() => handleLogOut()}>Log Out</button>
        <VenueContainer />
      </div>
    )
}
