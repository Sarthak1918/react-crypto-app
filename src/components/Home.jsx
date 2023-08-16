import React from 'react'
import "../styles/Home.scss"
import cryptoImg from "../assets/btc.png"
import Footer from './Footer'
function Home() {
  return (
    <>
    <div className='home-container'>
      <img src={cryptoImg} alt="crypto-img"/>
    </div>
    </>
  )
}

export default Home
