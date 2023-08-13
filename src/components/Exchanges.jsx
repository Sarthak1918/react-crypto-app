import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import "../styles/Exchanges.scss"
import ErrorComponent from './ErrorComponent'



function Exchanges() {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/exchanges?").then((result) => {
      setExchanges(result.data)
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setError(err);
    });
  }, [])

  if(error) return <ErrorComponent message={"Something Wrong Occurred while Fetching!Please try again.."}/>

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
