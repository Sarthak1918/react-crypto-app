import React, { useEffect, useState } from 'react'
import '../styles/Coins.scss'
import axios from 'axios'
import Loader from './Loader'
import "../styles/Exchanges.scss"
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'




function Coins() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr")

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`).then((result) => {
      setCoins(result.data)
      console.log(result.data)
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setError(err);
    });
  }, [currency, page])

  if (error) return <ErrorComponent message={"Something Wrong Occurred while Fetching Coins!Please try again.."} />

  return (
    <div className='coins-container'>
      <div className='coins-section'>
        {loading ? <Loader /> :
          <>
            {
              coins.map((e) => {
                return <CoinCard id={e.id} key={e.id} name={e.name} symbol={e.symbol} image={e.image} currencySymbol={currencySymbol} currentPrice={e.current_price}/>
              })
            }
          </>
        }
      </div>
    </div>
  )
}

export default Coins
