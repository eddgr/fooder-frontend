import React from 'react'
import { Link } from 'react-router-dom'

import adapter from '../services/adapter'

export default class Venue extends React.Component {
  componentDidMount() {
    adapter.fetchVenue(this.props.venue.id)
  }

  render() {
    console.log('Venue props', this.props)
    const { id, name, fsq_id, location, categories, favorites, lat, long, tip_photo } = this.props.venue

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

    return (
      <div className="card col-sm p-0 mb-2" data-fsq-id={fsq_id}>

        <Link to={`/venues/${id}`}>
          <div className="venue-card">
            <img src={tip_photo} className="card-img-top border-0" alt={name} />
            <div className="venue-card-text">
              <h2 className="card-title text-light">{name}</h2>
              <span className="text-light col-6">
                <strong>
                  {favorites.length}
                  <i className="fas fa-users pl-1"></i>
                </strong>
              </span>
              <span className="text-light col-6">
                <strong>
                  <i className="fas fa-map-pin pr-1"></i>
                  {parseFloat(distance(this.props.userLat, this.props.userLong, lat, long)).toFixed(2)} mi
                </strong>
              </span>
            </div>
          </div>
        </Link>

        <div className="card-body text-center">
          <div className="row justify-content-center text-center">
            <div className="col-6">
              <button
                className="btn btn-danger w-100"
                onClick={(event, venue) => this.props.handleLikeDislike(event, this.props.venue)}
                name="dislike">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-success w-100"
                onClick={(event, venue) => this.props.handleLikeDislike(event, this.props.venue)}
                name="like">
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ) // end return
  } // end render
}
