import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ProfileContainer extends React.Component {
  state = {
    showLikes: true
  }

  handleClick = event => {
    console.log(event.currentTarget.name)
    if (event.currentTarget.dataset.name === 'liked') {
      this.setState({
        showLikes: true
      })
    } else {
      this.setState({
        showLikes: false
      })
    }
  }

  likedVenues = likedDisliked => {
    let likeDislike

    if (likedDisliked === 'liked') {
      likeDislike = this.props.currentUser.liked
    } else {
      likeDislike = this.props.currentUser.disliked
    }

    return likeDislike.map(venue => {
      return (
        <div key={venue.id} className="col-4 pb-4">
          <Link to={`/venues/${venue.id}`}>
            <img src={venue.tip_photo} alt={venue.name} className="w-100" />
          </Link>
        </div>
      )
    })
  }
  render() {
    console.log("ProfileContainer props", this.props)
    const { username, liked, disliked } = this.props.currentUser

    return (
      <div className="text-center">
        <div className="m-4">
          <h2>{username}</h2>
        </div>

        <div className="row justify-content-center mb-4 border-top border-bottom border-light">
          <span className={this.state.showLikes ? "col-6 p-2 bg-light" : "col-6 p-2"} data-name="liked" onClick={event => this.handleClick(event)}>
            <strong>{liked.length}</strong> Likes
          </span>
          <span className={this.state.showLikes ? "col-6 p-2" : "col-6 p-2 bg-light"} data-name="disliked" onClick={event => this.handleClick(event)}>
            <strong>{disliked.length}</strong> Dislikes
          </span>
        </div>

        <div className="row">
          {
            this.state.showLikes ?
              this.likedVenues('liked')
            :
              this.likedVenues('disliked')
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ProfileContainer)
