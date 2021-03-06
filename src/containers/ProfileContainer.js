import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ProfileContainer extends React.Component {
  state = {
    showLikes: true,
    showInfo: true
  }

  componentDidMount() {
    this.props.resetSelect()
  }

  // HELPER FUNCTIONS
  handleClick = event => {
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
        <div key={venue.id} className="col-4 p-1">
          <Link to={`/venues/${venue.id}`}>
            <img src={venue.tip_photo} alt={venue.name} className="w-100" />
          </Link>
        </div>
      )
    })
  }

  handleLogOut = () => {
    this.props.logOut()
    // localStorage.token = ''
    // localStorage.user_id = ''
    localStorage.clear()
    window.location.href = '/'
  }

  showInfo = () => {
    return (
      this.state.showInfo &&
      <div onClick={() => this.hideInfo()} className="mt-4 shadow alert alert-info show-info">
        See all your likes and dislikes here.
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
    console.log("ProfileContainer props", this.props)
    const { username, liked, disliked } = this.props.currentUser

    return (
      <div className="text-center">
        <div className="m-4">
          <h2>{username}</h2>
          <button className="btn btn-outline-danger" onClick={() => this.handleLogOut()}>Log Out</button>
        </div>

        <div className="row justify-content-center mb-1 border-top border-bottom border-light">
          <span className={this.state.showLikes ? "col-6 p-2 bg-light" : "col-6 p-2"} data-name="liked" onClick={event => this.handleClick(event)}>
            <small>
              <strong>{liked.length}</strong> Likes
            </small>
          </span>
          <span className={this.state.showLikes ? "col-6 p-2" : "col-6 p-2 bg-light"} data-name="disliked" onClick={event => this.handleClick(event)}>
            <small>
              <strong>{disliked.length}</strong> Dislikes
            </small>
          </span>
        </div>

        {this.props.currentUser.liked.length <= 0 && this.showInfo()}

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

const mapDispatchToProps = dispatch => {
  return {
    resetSelect: () => {
      dispatch({ type: 'RESET_SELECT' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
