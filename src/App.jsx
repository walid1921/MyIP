import React, { useState, useEffect } from 'react';
import Map from './Map';



export default function App() {
  const [myAddress, setMyAddress] = useState({});
  const [country, setCountry] = useState([]);

  const [status, setStatus] = useState("loading")

  const userCountry = country.find(country => country.alpha2Code === myAddress.location.country);


  useEffect(() => {
    setStatus("loading")
    async function getAddress() {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_REACT_API_URL}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMyAddress(data);
        // console.log(data)
        setStatus("success")

      } catch (error) {
        console.error(error.message);
        setStatus("error")
      }
    }

    getAddress();
  }, []);

  useEffect(() => {
    setStatus("loading")
    async function getCountry() {
      try {
        const response = await fetch(`http://api.countrylayer.com/v2/all?access_key=bb4ec63ce7f584a5ac3671f691651bdf`);



        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data)
        setCountry(data)
       

        setStatus("success")

      } catch (error) {
        console.error(error.message);
        setStatus("error")
      }
    }


   
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-6">
      <div className='flex flex-col'>

        <span className='text-xl text-orange-300'>Your IP Address is : {myAddress.ip}</span>


        <p className='text-blue-400'>{myAddress.location ? myAddress.location.city : 'Unknown City'}</p>


        <p>{userCountry ? userCountry.name : 'Unknown Country'}</p>


      </div>

      {status === "success" ? <Map lat={myAddress.location && myAddress.location.lat} lng={myAddress.location && myAddress.location.lng} /> : null}

    </div>


  )
}
