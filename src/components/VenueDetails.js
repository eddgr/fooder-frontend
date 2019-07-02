import React from 'react'
import { connect } from 'react-redux'

import adapter from '../services/adapter'

class VenueDetails extends React.Component {
  state = {
    venue: {},
    likedByUser: false
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
      if (this.state.venue.favorites.includes(this.props.currentUser.id)){
        this.setState({
          ...this.state,
          likedByUser: true
        })
      }
    }, 1500)
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
        window.history.go(-1)
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
    this.props.unlikeVenue(venueObj, this.state.venue)
    this.setState({
      ...this.state,
      likedByUser: false
    })

  }

  details = () => {
    const { name, hours, location, price, tip_photo, tip_text, categories } = this.state.venue

    return (
      <>
        <img className="card-img-top" src={tip_photo} alt={name} />
        <div className="card-body">
          <h3 className="card-title">{name}</h3>

          <div className="text-black-50">
            <p className="mb-0 font-weight-bold">
                <i className="fas fa-utensils pr-1"></i> {categories}
            </p>

            {
              hours ?
                <p className="mb-0">
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

          <p className="text-info font-italic">
            <i className="fas fa-quote-left"></i> {tip_text} <i className="fas fa-quote-right"></i>
          </p>

          <hr />

          <div className="row justify-content-center text-center">
            {
              this.state.likedByUser ?
                <div className="col-6">
                  <button
                  data-user-id={this.props.currentUser.id}
                  data-rest-id={this.props.routeProps.match.params.id}
                  onClick={event => this.handleUnlike(event)}
                  className="btn btn-outline-success w-100">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              :
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
    likeVenue: venue => {
      dispatch({ type: 'LIKE_VENUE', venue: venue })
    },
    dislikeVenue: venue => {
      dispatch({ type: 'DISLIKE_VENUE', venue: venue })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueDetails)
