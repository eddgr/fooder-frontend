import React from 'react'

// import { Link } from 'react-router-dom'

export default function NavBar(props) {
  return (
    <div className="fixed-top">
      Search
      <b>fulfilld</b>
      {props.currentUser.username}
    </div>
  )
}
