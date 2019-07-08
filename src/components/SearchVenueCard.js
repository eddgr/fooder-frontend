import React from 'react'

import { Link } from 'react-router-dom'

export default function LikeVenue(props) {
  const { id, tip_photo, name } = props.venue

  return (
    <div className="card mt-2 mb-2">
      <Link
        className="card-link"
        to={`/venues/${id}`}
        id={id}>
        <div className="row no-gutters">

          <div className="col-4">
            <img src={tip_photo} className="w-100 rounded-left border-0 align-middle" alt="..." />
          </div>

          <div className="col-8 search-card">
            <p className="font-weight-bold text-info m-0">
              {name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
