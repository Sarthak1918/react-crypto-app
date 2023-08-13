import React from 'react'
import "../styles/CoinCard.scss"
import { Link } from 'react-router-dom'

function CoinCard({id,name,image,symbol,currencySymbol,currentPrice}) {
  return (
      <Link to={`/coin/${id}`} target= {"blank"} className='coin-card'>
        <img src ={ image } alt="logo"/>
        <h3>{symbol}</h3>
        <p>{name}</p>
        <h3>{currencySymbol} {currentPrice}</h3>

    </Link>
  )
}

export default CoinCard
