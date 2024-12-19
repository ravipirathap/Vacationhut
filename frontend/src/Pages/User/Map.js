// import React, { useState } from 'react';
// import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const MapContainer = ({ google }) => {
//   const [directions, setDirections] = useState(null);

//   const onReady = (result, status) => {
//     if (status === 'OK') {
//       setDirections(result);
//     }
//   };

//   return (
//     <div style={{ width: '100%', height: '1000px' }}>
//       <GoogleMap  
//         google={google}
//         zoom={14}
//         style={{ width: '100%', height: '1000px' }}
//         initialCenter={{ lat: 9.6612, lng: 80.0255 }} // Replace with your starting latitude and longitude
//       >
//         <Marker position={{ lat: 9.7108, lng: 80.0666 }} /> // Replace with your starting latitude and longitude

//         <DirectionsService
//           google={google}
//           options={{
//             destination: { lat: 9.6612, lng: 80.0255 }, // Replace with your destination coordinates
//             origin: { lat: 9.7108, lng: 80.0666 }, // Replace with your starting coordinates
//             travelMode: 'DRIVING',
//           }}
//           callback={onReady}
//         />

//         {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//     </div>
//   );
// };

// export default MapContainer;


import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';

const center = { lat: 48.8584, lng: 2.2945 };

function App() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCxZ4BrQx_QzbOU2s5exQMHdZjhk2d-FBc',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>

      <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '8px' }}>
          <Autocomplete>
            <input type="text" placeholder="Origin" ref={originRef} />
          </Autocomplete>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <Autocomplete>
            <input type="text" placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
        </div>
        <div>
          <button type="button" onClick={calculateRoute}>
            Calculate Route
          </button>
          <button type="button" onClick={clearRoute}>
            Clear Route
          </button>
        </div>
        <div style={{ marginTop: '8px' }}>
          <span>Distance: {distance}</span>
        </div>
        <div>
          <span>Duration: {duration}</span>
        </div>
      </div>
    </div>
  );
}

export default App;

