import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import LikeVenue from '../components/LikeVenue.js'

class LikeContainer extends React.Component {
  showLikes = () => {
    return this.props.likes.map(like => {
      return (
        <LikeVenue
          key={like.id}
          like={like}
          updateMessages={this.props.updateMessages}
          selectVenue={this.props.selectVenue} />
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
    selectVenue: venue => {
      dispatch({ type: 'SELECT_VENUE', venue: venue })
    },
    updateMessages: messageObj => {
      dispatch({ type: 'UPDATE_MESSAGES', payload: messageObj })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeContainer)
