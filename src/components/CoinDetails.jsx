import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadSVG from 'react-loadsvg';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

function CoinDetails() {
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr")

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
    <div>
      {loading ? <LoadSVG /> :
        <>
          sadsad
        </>}
    </div>
  )
}

export default CoinDetails
