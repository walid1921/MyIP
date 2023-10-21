import React, { useState, useEffect } from 'react';
import Map from './Map';



export default function App() {
  const [myAddress, setMyAddress] = useState({});

  useEffect(() => {
    async function getAddress() {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_REACT_API_URL}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMyAddress(data);
        console.log(data)

      } catch (error) {
        console.error(error.message);
      }
    }

    getAddress();
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-6">
      <div className='flex flex-col'>

        <span className='text-xl text-orange-300'>Your IP Address is : {myAddress.ip}</span>


        <p className='text-blue-400'>{myAddress.location ? myAddress.location.city : 'Unknown City'}</p>

        <p>{myAddress.location && myAddress.location.lng}</p>

        
      </div>

      <Map  lat={myAddress.location && myAddress.location.lat} lng={myAddress.location && myAddress.location.lng} />
    </div>


  )
}
