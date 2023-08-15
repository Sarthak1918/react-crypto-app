import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import "../styles/CoinDetails.scss"
import moment from 'moment/moment';
import upicon from "../assets/up-icon.png"
import downicon from "../assets/down-icon.png"
import Loader from './Loader';
import addComma from '../core/function/addComma';
import Chart from './Chart';

function CoinDetails() {
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("24h")
  const [chartArray, setChartArray] = useState([])

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const params = useParams()



  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
        const { data: chartData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setCoin(data)
        setChartArray(chartData.prices)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchCoin();
  }, [currency, days, params.id])

  if (error) return <ErrorComponent message={"Something Wrong Occurred while Fetching Coin!Please try again.."} />

  const chartButtons = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]
  function switchChartStats(key) {
    switch (key) {
      case "24h":
        setDays("24h")
        break;

      case "7d":
        setDays("7d")
        break;

      case "14d":
        setDays("14d")
        break;

      case "30d":
        setDays("30d")
        break;

      case "60d":
        setDays("60d")
        break;

      case "200d":
        setDays("200d")
        break;

      case "1y":
        setDays("365d")
        break;

      case "max":
        setDays("max")
        break;

      default:
        setDays("24h")
        break;
    }
  }


  return (
    <div className="coin-details-container">
      {loading ? <Loader /> :
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



          <div className='update-info'><h4>Last updated on {moment(coin.last_updated).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h4></div>


          <div className='coin-details'>

            <div className="coin-details-left">
              <img className='coin-img' src={coin.image.large} alt='coin-img' />
              <h3>{coin.name}</h3>
              <h2>{currencySymbol}{addComma(coin.market_data.current_price[currency])}</h2>
              <h4>
                <img
                  className='indicator-img'
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
                <h5 style={{ backgroundColor: "#f78989", padding: "5px" }}>{currencySymbol}{coin.market_data.low_24h[currency]}</h5>
                <h5>24hr Range</h5>
                <h5 style={{ backgroundColor: "#92e79b", padding: "5px" }}>{currencySymbol}{coin.market_data.high_24h[currency]}</h5>
              </div>

            </div>


            <div className='coin-details-right'>
              <RightDetailsItem property={"Market Cap Rank"} value={coin.market_cap_rank} />
              <RightDetailsItem property={"Max Supply"} value={coin.market_data.max_supply ? coin.market_data.max_supply : "NA"} />
              <RightDetailsItem property={"Circulating Supply"} value={coin.market_data.circulating_supply} />
              <RightDetailsItem property={"Market Cap"} value={`${currencySymbol}${addComma(coin.market_data.market_cap[currency])}`} />
              <RightDetailsItem property={"All time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <RightDetailsItem property={"All time high"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </div>



          </div>
          <div className="chart-section">
            <Chart arr={chartArray} currency={currency} days={days} />
            <div className='chart-section-btns'>
              {
                chartButtons.map((btn) => {
                  return <button onClick={() => switchChartStats(btn)}>{btn}</button>
                })
              }
            </div>
          </div>

        </>
      }
    </div>
  )
}


function RightDetailsItem({ property, value }) {
  return <div className='coin-details-right-items'>
    <p><strong>{property}</strong></p>
    <p><strong>{value}</strong></p>
  </div>
}

export default CoinDetails
