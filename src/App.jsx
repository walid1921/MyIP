import { useState, useEffect } from 'react';
import Map from './Map';
import axios from "axios";



export default function App() {
  const [myAddress, setMyAddress] = useState({});
  const [country, setCountry] = useState({});
  const [flag, setFlag] = useState({});

  const [status, setStatus] = useState("loading")

  useEffect(() => {

    setStatus("loading")

    axios.get(`https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_REACT_API_URL}`)
      .then((data) => {
        setMyAddress(data.data);
        axios.get(`https://restcountries.com/v3.1/alpha/${data.data.location.country}?fields=name,flags`)
          .then((data) => {
            setCountry(data.data.name)
            setFlag(data.data.flags)
            setStatus("success")
          })
          .catch((error) => {
            console.error(error.message);
            setStatus("error")
          })
      })
      .catch((error) => {
        console.error(error.message);
        setStatus("error")
      })

  }, []);


  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-6">
      <div className='flex flex-col'>

        <span className='text-xl text-orange-300'>Your IP Address is : {myAddress.ip}</span>


        <p className='text-blue-400'>{myAddress.location ? myAddress.location.city : 'Unknown City'}</p>


        <p>{country.common ? country.common : 'Unknown Country'}</p>
        <img height={50} width={50} src={flag.svg} alt="Italian Trulli" />



      </div>

      {status === "success" ? <Map lat={myAddress.location && myAddress.location.lat} lng={myAddress.location && myAddress.location.lng} /> : null}

    </div>


  )
}