import React from 'react'

import { Link } from 'react-router-dom'

export default function LikeVenue(props) {
  return (
    <div className="card m-4">
      <div className="row no-gutters">
        <div className="col-4">
          <img src="..." className="card-img" alt="..." />
        </div>

        <div className="col-8">
          <div className="card-body">
            <h3 className="card-title">
              <Link
            onClick={() => props.selectVenue(props.like)}
            to='/chats'
            id={props.like.id}>
                {props.like.name}
              </Link>
            </h3>

            <p>{props.like.categories}</p>
            <p>{props.like.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
