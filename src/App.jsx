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
    <div className=" h-[100vh] flex  justify-center items-center gap-6">
      <div className='flex h-[500px]  bg-white rounded-lg'>
        <div className=' flex flex-col justify-center '>

          <div className='h-[50%] flex flex-col justify-center items-center gap-4'>
            <h1 className='font-semibold text-2xl text-orange-300'>Your IP Address is : {myAddress.ip}</h1>


            <p className='text-blue-400 text-xl'>{myAddress.location ? myAddress.location.city : 'Unknown City'}</p>

            <p className='text-lg font-semibold'>{country.common ? country.common : 'Unknown Country'}</p>
          </div>


          <img className='w-full h-[50%] rounded-bl-xl' src={flag.svg} alt="Italian Trulli" />

        </div>







        {status === "success" ? <Map lat={myAddress.location && myAddress.location.lat} lng={myAddress.location && myAddress.location.lng} /> : null}
      </div>



    </div>


  )
}