import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadSVG from 'react-loadsvg';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import "../styles/CoinDetails.scss"
import moment from 'moment/moment';
import upicon from "../assets/up-icon.png"
import downicon from "../assets/down-icon.png"

function CoinDetails() {
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr")

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const params = useParams()

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`).then((result) => {
      setCoin(result.data)
      console.log(result.data)
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      setError(err);
    });
  }, [params.id])

  if (error) return <ErrorComponent message={"Something Wrong Occurred while Fetching Coin!Please try again.."} />

  return (
    <div className="coin-details-container">
      {loading ? <LoadSVG /> :
        <>


          <div className='currency-selection'>
            <div>
              <input type="radio" name="currency" id='inr' value={"inr"} defaultChecked onClick={(e) => { setCurrency(e.target.value) }} />
              <label htmlFor='inr'>INR</label>
            </div>
            <div>
              <input type="radio" name="currency" id='usd' value={"usd"} onClick={(e) => { setCurrency(e.target.value) }} />
              <label htmlFor='usd'>USD</label>
            </div>
            <div>
              <input type="radio" name="currency" id='eur' value={"eur"} onClick={(e) => { setCurrency(e.target.value) }} />
              <label htmlFor='eur'>EUR</label>
            </div>
          </div>



          <div className='update-info'>Last updated on {moment(coin.last_updated).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>


          <div className='coin-details'>

            <div className="coin-details-left">
              <img src={coin.image.large} alt='coin-img' />
              <h5>{coin.name}</h5>
              <h2>{currencySymbol}{coin.market_data.current_price[currency]}</h2>
              <h4>
                <img
                  width={16}
                  src={coin.market_data.price_change_percentage_24h_in_currency[currency] > 0 ? upicon : downicon}
                  alt="indicator"
                />
                {coin.market_data.price_change_percentage_24h_in_currency[currency]}%
              </h4>

              <progress
                className='progress-bar'
                value={
                  (coin.market_data.current_price[currency] - coin.market_data.low_24h[currency]) / 
                  (coin.market_data.high_24h[currency] - coin.market_data.low_24h[currency]) * 100
                }
                min={0}
                max={100}
              />
              <div className='progress-stats'>
                <h5 style={{ backgroundColor: "#f78989" }}>{currencySymbol}{coin.market_data.low_24h[currency]}</h5>
                <h5>24hr Range</h5>
                <h5 style={{ backgroundColor: "#92e79b" }}>{currencySymbol}{coin.market_data.high_24h[currency]}</h5>
              </div>

            </div>


            <div className='coin-details-right'>
              fjskdvlskdkjsndkn
            </div>



          </div>

        </>}
    </div>
  )
}

export default CoinDetails
