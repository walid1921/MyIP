import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ lat, lng, flag }) {

  const position = [lat, lng]

  
  return (
    <div className='h-[500px] w-[700px]'>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Your current location <img className='h-5 w-5' src={flag} alt={flag} />
            
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
