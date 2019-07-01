import React from 'react'

import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'

export default function LikeVenue(props) {
  const moment = require('moment')

  const updateMessagePreview = messageObj => {
    props.updateMessages(messageObj)
    props.updateStateLikes(props.like.id, messageObj)
  }

  const latestMessage = () => {
    if (props.like.messages.length > 0) {
      const lastMessage = props.like.messages.slice(-1)

      return (
        <>
          <strong>
            {
              lastMessage[0].user_name ?
                lastMessage[0].user_name
              :
                lastMessage[0].username
            }
          </strong>
          <br />
          {lastMessage[0].content.substring(0, 20)}
          {lastMessage[0].content.length > 20 ? "..." : null}
          <br />
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
      channel={{ channel: "ChatThreadChannel", restaurant_id: props.like.id }}
      onReceived={data => updateMessagePreview(data.payload)} />

      <div className="row no-gutters">
        <div className="col-4">
          <img src="..." className="card-img" alt="..." />
        </div>

        <div className="col-8">
          <div className="card-body">
            <div className="row card-title">
              <span className="col-8">
                <Link
                  className="font-weight-bold"
                  onClick={() => props.selectVenue(props.like)}
                  to='/chats'
                  id={props.like.id}>
                  {props.like.name.substring(0,10)}
                  {props.like.name.length > 10 ? '...' : null}
                </Link>
              </span>

              <span className="col-4 text-warning text-right">
                <strong>
                  {props.like.favorites.length}
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
