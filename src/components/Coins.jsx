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

  const btns = new Array(101).fill(1);

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

  function changePage(pageNumber) {
    setPage(pageNumber);
    setLoading(true)
  }


  return (
    <div className='coins-container'>
      <div className='currency-selection'>
        <div>
          <input type="radio" name="currency" id='inr' value={"inr"} defaultChecked onClick={(e)=>{setCurrency(e.target.value)}}/>
          <label htmlFor='inr'>INR</label>
        </div>
        <div>
          <input type="radio" name="currency" id='usd' value={"usd"} onClick={(e)=>{setCurrency(e.target.value)}}/>
          <label htmlFor='usd'>USD</label>
        </div>
        <div>
          <input type="radio" name="currency" id='eur' value={"eur"} onClick={(e)=>{setCurrency(e.target.value)}}/>
          <label htmlFor='eur'>EUR</label>
        </div>

      </div>
      <div className='coins-section'>
        {loading ? <Loader /> :
          <>
            {
              coins.map((e) => {
                return <CoinCard id={e.id} key={e.id} name={e.name} symbol={e.symbol} image={e.image} currencySymbol={currencySymbol} currentPrice={e.current_price} />
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

export default Coins
