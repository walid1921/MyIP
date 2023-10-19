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

      } catch (error) {
        console.error(error.message);
      }
    }

    getAddress();
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <p className='text-xl text-orange-300'>
        Your IP Address is :
        <span className='text-blue-400'> {myAddress.ip}</span>
      </p>

      <Map yourAddress={myAddress.ip} />
    </div>


  )
}
