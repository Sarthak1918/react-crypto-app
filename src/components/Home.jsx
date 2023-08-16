import React from 'react'
import "../styles/Home.scss"
import cryptoImg from "../assets/btc.png"
import { useTypewriter, Cursor } from "react-simple-typewriter"
function Home() {
  const [text] = useTypewriter({
    words: [ "learning.", "growth.","awareness."],
    loop: {},
    typeSpeed:70,
    deleteSpeed:35
  })
  return (
    <>
      <div className='home-container'>
        <img src={cryptoImg} alt="crypto-img" />
        <div className='typeWriterText'>
          <h1>Empowering Your Crypto<span> {text}<Cursor cursorStyle="|" cursorColor='white'/></span></h1>
        </div>
      </div>
    </>
  )
}

export default Home
