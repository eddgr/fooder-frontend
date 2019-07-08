import React from 'react'

import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'

import moment from 'moment'

export default function LikeVenue(props) {
  const { id, messages, tip_photo, name, favorites } = props.like

  const updateMessagePreview = messageObj => {
    props.updateMessages(messageObj)
    props.updateStateLikes(props.like.id, messageObj)
  }

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
      <ActionCableConsumer
      channel={{ channel: "ChatThreadChannel", restaurant_id: id }}
      onReceived={data => updateMessagePreview(data.payload)} />

      <Link
        className="card-link"
        onClick={() => props.selectVenue(props.like)}
        to='/chats'
        id={id}>
        <div className="row no-gutters">

          {
            iphone5.matches ?
              null
              :
              <div className="col-4">
                <img src={tip_photo} className="card-img rounded-0 border-0 h-100" alt="..." />
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
