import React from 'react'

export default function Venue(props) {
  const { id, name, fsq_id, location, categories, favorites } = props.venue

  return (
    <div className="card m-4" data-fsq-id={fsq_id}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>

        <p className="text-warning">
          <strong>
            {favorites.length}
            <i className="fas fa-users pl-1"></i>
          </strong>
        </p>
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
