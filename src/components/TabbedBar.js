import React from 'react'

import { Link } from 'react-router-dom'

export default function TabbedBar() {
  return (
    <div className="fixed-bottom">
      <Link to='/'>Home</Link>
      <Link to='/likes'>Likes</Link>
    </div>
  )
}
