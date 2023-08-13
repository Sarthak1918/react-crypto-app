import React from 'react'
import "../styles/Header.scss"
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='header-container'>
      <p><Link to="/">Home</Link></p>
      <p><Link to="/exchanges">Exchanges</Link></p>
      <p><Link to="/coins">Coins</Link></p>
    </div>
  )
}

export default Header
