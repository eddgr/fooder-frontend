import React from 'react'
import { connect } from 'react-redux'

import adapter from '../services/adapter'

class VenueDetails extends React.Component {
  state = {
    venue: {},
    likedByUser: false,
    dislikedByUser: false
  }

  componentDidMount() {
    adapter.fetchVenue(this.props.routeProps.match.params.id)
      .then(data => {
        this.setState({
          venue: data
        })
      })

    // setTimeout to wait for current props.currentUser to load before changing state
    setTimeout(() => {
      // check if venue has been liked
      if (this.state.venue.favorites.includes(this.props.currentUser.id)){
        this.setState({
          ...this.state,
          likedByUser: true
        })
      }

      // check if venue has been disliked
      if (this.state.venue.dislikes.includes(this.props.currentUser.id)){
        this.setState({
          ...this.state,
          likedByUser: true,
          dislikedByUser: true
        })
      }
    }, 1000)
  }

  // HELPER FUNCTIONS
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
        this.setState({
          likedByUser: true
        })
        break
      case "dislike":
        console.log("dislike")
        adapter.likeDislikeReq({
          user_id: this.props.currentUser.id,
          restaurant_id: venue.id,
          liked: false
        })
        this.props.dislikeVenue(venue)
        this.setState({
          likedByUser: true,
          dislikedByUser: true
        })
        break
      default:
        console.log("Like or Dislike")
    }
  }

  handleUnlike = event => {
    const venueObj = {
      user_id: event.currentTarget.dataset.userId,
      restaurant_id: event.currentTarget.dataset.restId
    }
    adapter.unlikeReq(venueObj)

    if (this.state.dislikedByUser){
      this.props.undislikeVenue(venueObj, this.state.venue)
    } else {
      this.props.unlikeVenue(venueObj, this.state.venue)
    }

    this.setState({
      ...this.state,
      likedByUser: false,
      dislikedByUser: false
    })

  }

  actionButton = () => {
    return (
      <>
        <div className="col">
          <button
          data-user-id={this.props.currentUser.id}
          data-rest-id={this.props.routeProps.match.params.id}
          onClick={event => this.handleUnlike(event)}
          className={this.state.dislikedByUser ? "btn w-100 btn-outline-danger" : "btn w-100 btn-outline-success"}>
            <i className={this.state.dislikedByUser ? "fas fa-times" : "fas fa-heart"}></i>
          </button>
        </div>
      </>
    )
  }

  allButtons = () => {
    return (
      <>
        <div className="col-6">
          <button
            name="dislike"
            onClick={event => this.handleLikeDislike(event, this.state.venue)}
            className="btn btn-danger w-100">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="col-6">
          <button
            name="like"
            onClick={event => this.handleLikeDislike(event, this.state.venue)}
            className="btn btn-success w-100">
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </>
    )
  }

  details = () => {
    const { name, hours, location, tip_photo, tip_text, favorites, categories } = this.state.venue

    return (
      <>
        <div className="venue-card">
          <img className="card-img-top" src={tip_photo} alt={name} />
          <div className="venue-card-text">
            <h2 className="card-title text-light">{name}</h2>
          </div>
        </div>
        <div className="card-body">

          <div className="text-black-50">
            <p className="font-weight-bold">
                <i className="fas fa-utensils pr-1"></i> {categories}
            </p>

            {
              hours ?
                <p>
                  <small>
                  <i className="far fa-clock"></i> {hours}
                  </small>
                </p>
              :
                null
            }

            <p>
              <small>
                {location}
              </small>
            </p>
          </div>

          <hr />

          {
            tip_text ?
              <>
                <p className="text-info font-italic">
                  <i className="fas fa-quote-left"></i> {tip_text} <i className="fas fa-quote-right"></i>
                </p>

                <hr />
              </>
            :
              null
          }

          <div className="row justify-content-center text-center">
            {
              this.state.likedByUser ?
                this.actionButton()
              :
                this.allButtons()
            }
          </div>

        </div>
      </>
    )
  }
  // end HELPER FUNCTIONS

  render() {
    console.log('VenueDetails', this.state)
    return (
      <div className="card text-center">
        {this.details()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unlikeVenue: (venueObj, venue) => {
      dispatch({ type: 'UNLIKE_VENUE', payload: venueObj, venue: venue })
    },
    undislikeVenue: (venueObj, venue) => {
      dispatch({ type: 'UNDISLIKE_VENUE', payload: venueObj, venue: venue })
    },
    likeVenue: venue => {
      dispatch({ type: 'LIKE_VENUE', venue: venue })
    },
    dislikeVenue: venue => {
      dispatch({ type: 'DISLIKE_VENUE', venue: venue })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueDetails)
