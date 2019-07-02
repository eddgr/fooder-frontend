import React from 'react'

import adapter from '../services/adapter'
// import { connect } from 'react-redux'

class VenueDetails extends React.Component {
  state = {
    venue: {}
  }

  componentDidMount() {
    adapter.fetchVenue(this.props.match.params.id)
      .then(data => {
        this.setState({
          venue: data
        })
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
            <p className="mb-0">
              <small>
              <i className="far fa-clock"></i> {hours}
              </small>
            </p>
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
        </div>
      </>
    )
  }

  render() {
    console.log(this.state)
    return (
      <div className="card text-center">
        {this.details()}
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     venues: state.venues
//   }
// }
export default VenueDetails
