import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class LikeContainer extends React.Component {
  showLikes = () => {
    return this.props.likes.map(like => {
      return (
        <div key={like.id}>
          <Link
            onClick={() => this.props.selectVenue(like.id)}
            to='/sandbox'
            id={like.id}>
            {like.name}
          </Link>
          {like.categories}
          {like.location}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.showLikes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    likes: state.currentUser.liked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectVenue: venueId => {
      dispatch({ type: 'SELECT_VENUE', venueId: venueId })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeContainer)
