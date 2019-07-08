import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Venue from '../components/Venue'
import loadingScreen from '../components/Loading'

import adapter from '../services/adapter'

class VenueContainer extends React.Component {
  state = {
    showInfo: true
  }

  componentDidMount() {
    if (this.props.venues.loading) {
      setTimeout(() => {
        console.log("Venue loading...")
        adapter.fetchRestaurants()
        .then(data => {
          const newData = data.filter(venue => {
            return !venue.favorites.includes(this.props.currentUser.id) && !venue.dislikes.includes(this.props.currentUser.id)
            // filter out if current user likes and dislikes a venue
          })

          // add distance function
          const distance = (lat1, lon1, lat2, lon2, unit) => {
            if ((lat1 === lat2) && (lon1 === lon2)) {
              return 0;
            }
            else {
              var radlat1 = Math.PI * lat1/180;
              var radlat2 = Math.PI * lat2/180;
              var theta = lon1-lon2;
              var radtheta = Math.PI * theta/180;
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              if (dist > 1) {
                dist = 1;
              }
              dist = Math.acos(dist);
              dist = dist * 180/Math.PI;
              dist = dist * 60 * 1.1515;
              if (unit==="K") { dist = dist * 1.609344 }
              if (unit==="N") { dist = dist * 0.8684 }
              return dist;
            }
          }
          // sort by distance

          const newDistanceData = newData.sort((a, b) => {
            // add a reference to the distance
            let aDistance = distance(this.props.currentUser.location.lat, this.props.currentUser.location.long, a.lat, a.long)
            let bDistance = distance(this.props.currentUser.location.lat, this.props.currentUser.location.long, b.lat, b.long)

            return aDistance - bDistance
          })

          this.props.addVenues(newDistanceData)
          this.props.initialLoad()
          // turns off loading
        }) // end then
      }, 1500) // end setTimeout
    } // end if
  }

  // HELPER FUNCTIONS
  emptyVenues = () => {
    return (
      <div className="empty-venues text-info">
        <h3>No more venues near you!</h3>
        <p>Re-visit the ones you've liked:</p>
        <div className="row">
          {this.props.currentUser.liked.slice(-9).map(rest => {
            return (
              <div key={rest.id} className="col-4 p-1">
                <Link to={`/venues/${rest.id}`}>
                  <img
                   src={rest.tip_photo}
                   className="w-100"
                   alt={rest.name} />
               </Link>
             </div>
            )
          })}
        </div>
      </div>
    )
  }

  displayVenues = () => {
    if (this.props.venues.venues.length > 0) {
      return (
        this.props.venues.venues.map(venue => {
          return (
            <Venue
              userLat={this.props.currentUser.location.lat}
              userLong={this.props.currentUser.location.long}
              key={venue.id}
              handleLikeDislike={this.handleLikeDislike}
              likeVenue={this.props.likeVenue}
              dislikeVenue={this.props.dislikeVenue}
              venue={venue} />
          )
        })
      ) // end return
    } else {
      return (
        this.emptyVenues()
      )
    }
  }

  handleLikeDislike = (event, venue) => {
    switch(event.currentTarget.name) {
      case "like":
        console.log("like")
        adapter.likeDislikeReq({
          user_id: this.props.currentUser.id,
          restaurant_id: venue.id,
          liked: true
        })
        this.props.likeVenue(venue)
        break
      case "dislike":
        console.log("dislike")
        adapter.likeDislikeReq({
          user_id: this.props.currentUser.id,
          restaurant_id: venue.id,
          liked: false
        })
        this.props.dislikeVenue(venue)
        break
      default:
        console.log("Like or Dislike")
    }
  }

  showMatch = () => {
    return (
      this.state.showInfo &&
      <div onClick={() => this.hideInfo()} className="shadow alert alert-info show-match">
        Chat with other people who liked the same venues. Find chats in ♥
      </div>
    )
  }

  hideInfo = () => {
    this.setState({
      showInfo: false
    })
  }
  // end HELPER FUNCTIONS

  render() {
    console.log("VenueContainer props", this.props)
    return (
      <div>
        {
          this.props.venues.loading ?
            loadingScreen()
            :
            <>
              {this.props.currentUser.liked.length <= 0 ? this.showMatch() : null}

              {this.displayVenues()}
            </>
        }
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
