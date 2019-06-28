import React from 'react'

export default function Venue(props) {
  const { id, name, fsq_id, location, categories, favorites, lat, long } = props.venue

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

  console.log('Venue props', props)

  return (
    <div className="card m-4" data-fsq-id={fsq_id}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title text-center">{name}</h3>
        <div className="row mb-3">
          <span className="text-warning text-center col-6">
            <strong>
              {favorites.length}
              <i className="fas fa-users pl-1"></i>
            </strong>
          </span>
          <span className="text-info text-center col-6">
            <strong>
              <i className="fas fa-map-pin pr-1"></i>
              {parseFloat(distance(props.userLat, props.userLong, lat, long)).toFixed(2)}m
            </strong>
          </span>
        </div>
        <p>{location}</p>
        <p>{categories}</p>

        <div className="row justify-content-center text-center">
          <div className="col-6">
            <button
              className="btn btn-danger w-100"
              onClick={(event, venue) => props.handleLikeDislike(event, props.venue)}
              name="dislike"
              data-id={id}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-success w-100"
              onClick={(event, venue) => props.handleLikeDislike(event, props.venue)}
              name="like"
              data-id={id}>
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
