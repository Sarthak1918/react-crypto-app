import React from 'react'
import "../styles/Header.scss"
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='header-container'>
      <Link to="/" className='logo'>
        <h2>XCrypto</h2>
      </Link>
      <div className='header-options'>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/exchanges">Exchanges</Link></p>
        <p><Link to="/coins">Coins</Link></p>
      </div>

    </div>
  )
}

export default Header
