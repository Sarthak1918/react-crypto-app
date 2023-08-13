import React from 'react'
import "../styles/ExchangeCard.scss"
function ExchangeCard({name,rank,image,url}) {
  return (
      <a href={url} target= "blank" className='exchange-card'>
        <img src ={ image } alt="logo"/>
        <h4>{rank}</h4>
        <h3>{name}</h3>
    </a>
  )
}

export default ExchangeCard
