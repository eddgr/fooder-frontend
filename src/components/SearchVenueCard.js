import React from 'react'

import { Link } from 'react-router-dom'

import moment from 'moment'

export default function LikeVenue(props) {
  const { id, messages, tip_photo, name, favorites } = props.venue

  const iphone5 = window.matchMedia("(max-width: 320px)")

  const latestMessage = () => {
    if (messages.length > 0) {
      const lastMessage = messages.slice(-1)[0]
      return (
        <>
          <p className="mb-n1">
            <strong className="pr-1">
              {
                lastMessage.user_name ?
                  lastMessage.user_name
                :
                  lastMessage.username
              }:
            </strong>

            {lastMessage.content.substring(0, 16)}
            {lastMessage.content.length > 16 ? "..." : null}
          </p>
          <small><em>
            {moment(lastMessage.created_at).fromNow()}
          </em></small>
        </>
      )
    }
  }

  return (
    <div className="card rounded-0 mt-2 mb-2">
      <Link
        className="card-link"
        to={`/venues/${id}`}
        id={id}>
        <div className="row no-gutters">

          {
            iphone5.matches ?
              null
              :
              <div className="col-4">
                <img src={tip_photo} className="card-img rounded-0 border-0 align-middle" alt="..." />
              </div>
          }

          <div className={iphone5.matches ? "col" : "col-8"}>
            <div className="card-body">
              <div className="row card-title mb-1">
                <span className="col-8 font-weight-bold text-info">
                    {name.substring(0,10)}
                    {name.length > 10 ? '...' : null}
                </span>

                <span className="col-4 text-warning text-right">
                  <strong>
                    {favorites.length}
                    <i className="fas fa-users pl-1"></i>
                  </strong>
                </span>
              </div>

              <div className="text-black-50">
                {latestMessage()}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
