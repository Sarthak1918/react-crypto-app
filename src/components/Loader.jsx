import React from 'react'
import LoadSVG from 'react-loadsvg';
import '../styles/Loader.scss'


function Loader() {
  return (
    <div className='loader'>
      <LoadSVG size={60} color="blue" />
    </div>
  )
}

export default Loader
