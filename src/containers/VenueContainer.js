import React from 'react'
import { connect } from 'react-redux'

import Venue from '../components/Venue'

const BACKEND_API = 'http://localhost:8000/api/v1'

class VenueContainer extends React.Component {
  componentDidMount() {
    fetch(BACKEND_API + '/restaurants')
      .then(r => r.json())
      .then(data => {
        this.props.addVenues(data)
      })
  }

  displayVenues = () => {
    return this.props.venues.venues.map(venue => {
      return (
        <Venue
          key={venue.id}
          venue={venue} />
      )
    })
  }
  render() {
    console.log("VenueContainer props", this.props)
    return (
      <div className="m-4">
        VenueContainer
        {this.displayVenues()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // can select specific pieces from state not just the whole object
    currentUser: state.currentUser,
    venues: state.venues
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVenues: venues => {
      dispatch({type: 'ADD_VENUES', payload: venues})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueContainer)
