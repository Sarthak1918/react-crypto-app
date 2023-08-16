import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import "../styles/Exchanges.scss"
import ErrorComponent from './ErrorComponent'
import Pagination from './Pagination'



function Exchanges() {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);


  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/exchanges?page=${page}`).then((result) => {
      setExchanges(result.data)
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setError(err);
    });
  }, [page])

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
      <div className='pagination-btns'>
       <Pagination size={10} setLoading={setLoading} setPage={setPage}/>
      </div>
    </div>
  )
}

export default Exchanges
