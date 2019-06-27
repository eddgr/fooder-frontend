import React from 'react'
import { connect } from 'react-redux'

class LikeContainer extends React.Component {
  showLikes = () => {
    return this.props.likes.map(like => {
      return (
        <div key={like.id}>
          {like.name}
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

export default connect(mapStateToProps)(LikeContainer)
