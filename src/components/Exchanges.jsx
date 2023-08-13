import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import "../styles/Exchanges.scss"
function Exchanges() {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/exchanges?").then((result) => {
      setExchanges(result.data)
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
  }, [])


  return (
    <div className='exchanges-container'>
      <div className='exchanges-section'>
        {loading ? <Loader /> :
          <>
            {
              exchanges.map((e) => {
                return <ExchangeCard key={e.id} name={e.name} rank={e.trust_score_rank} image={e.image} url={e.url} />
              })
            }
          </>
        }
      </div>
    </div>
  )
}

export default Exchanges
