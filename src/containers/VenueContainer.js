import React from 'react'
import { connect } from 'react-redux'

import Venue from '../components/Venue'

const BACKEND_API = 'http://localhost:8000/api/v1'

class VenueContainer extends React.Component {
  componentDidMount() {
    if (this.props.venues.loaded) {

    } else {
      fetch(BACKEND_API + '/restaurants', {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      })
      .then(r => r.json())
      .then(data => {
        const newData = data.filter(venue => !venue.favorites.includes(this.props.currentUser.id))

        this.props.addVenues(newData)

        this.props.initialLoad()
        })
    }
  }

  // HELPER FUNCTIONS
  displayVenues = () => {
    return this.props.venues.venues.map(venue => {
      return (
        <Venue
          key={venue.id}
          handleLikeDislike={this.handleLikeDislike}
          likeVenue={this.props.likeVenue}
          dislikeVenue={this.props.dislikeVenue}
          venue={venue} />
      )
    })
  }

  handleLikeDislike = (event, venue) => {
    switch(event.target.name) {
      case "like":
        console.log("like")
        fetch(BACKEND_API + '/favorites', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            user_id: this.props.currentUser.id,
            restaurant_id: venue.id,
            liked: true
          })
        })
        this.props.likeVenue(venue)
        break
      case "dislike":
        console.log("dislike")
        fetch(BACKEND_API + '/favorites', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            user_id: this.props.currentUser.id,
            restaurant_id: venue.id,
            liked: false
          })
        })
        this.props.dislikeVenue(venue)
        break
      default:
        console.log("Like or Dislike")
    }
  }
  // end HELPER FUNCTIONS

  render() {
    console.log("VenueContainer props", this.props)
    return (
      <div className="m-4">
        VenueContainer<br />
        {this.props.venues.loaded ? this.displayVenues() : "Loading"}
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
      dispatch({ type: 'ADD_VENUES', payload: venues })
    },
    likeVenue: venue => {
      dispatch({ type: 'LIKE_VENUE', venue: venue })
    },
    dislikeVenue: venue => {
      dispatch({ type: 'DISLIKE_VENUE', venue: venue })
    },
    initialLoad: () => {
      dispatch({ type: 'INITIAL_LOAD' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueContainer)
