import React from 'react'

export default function Venue(props) {
  const { id, name, fsq_id, location, categories } = props.venue
  return (
    <div className="m-4" data-fsq-id={fsq_id}>
      {name}<br />
      {location}<br />
      {categories}<br />

      <button
        onClick={() => props.likeVenue(props.venue)}
        name="like"
        data-id={id}>
        Like
      </button>

      <button
        onClick={() => props.dislikeVenue(props.venue)}
        name="dislike"
        data-id={id}>Dislike</button>
    </div>
  )
}
