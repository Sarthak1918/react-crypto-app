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

  const btns = new Array(10).fill(1);

  
  function changePage(pageNumber) {
    setPage(pageNumber);
    setLoading(true)
  }


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
      <div className='btns'>
        {btns.map((item, index) => {
          return <button className='page-btn' onClick={(e) => {
            changePage(index + 1)
            document.querySelectorAll(".page-btn").forEach((btn)=>btn.classList.remove("page-selected"))
            e.target.classList.add("page-selected")
          }}>{index + 1}</button>
        })}
      </div>
    </div>
  )
}

export default Exchanges
