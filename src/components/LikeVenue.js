import React from 'react'

import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'

import moment from 'moment'

export default function LikeVenue(props) {
  const { id, messages, tip_photo, name, favorites } = props.like

  // const moment = require('moment')

  const updateMessagePreview = messageObj => {
    props.updateMessages(messageObj)
    props.updateStateLikes(id, messageObj)
  }

  const latestMessage = () => {
    if (messages.length > 0) {
      const lastMessage = messages.slice(-1)

      return (
        <>
          <p className="mb-n1">
            <strong className="pr-1">
              {
                lastMessage[0].user_name ?
                  lastMessage[0].user_name
                :
                  lastMessage[0].username
              }:
            </strong>

              {lastMessage[0].content.substring(0, 16)}
              {lastMessage[0].content.length > 16 ? "..." : null}
          </p>
          <small><em>
            {moment(lastMessage[0].created_at).fromNow()}
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

      <div className="row no-gutters">
        <div className="col-4">
          <img src={tip_photo} className="card-img rounded-0 border-0 align-middle" alt="..." />
        </div>

        <div className="col-8">
          <div className="card-body">
            <div className="row card-title mb-1">
              <span className="col-8">
                <Link
                  className="font-weight-bold"
                  onClick={() => props.selectVenue(props.like)}
                  to='/chats'
                  id={id}>
                  {name.substring(0,10)}
                  {name.length > 10 ? '...' : null}
                </Link>
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
    </div>
  )
}
