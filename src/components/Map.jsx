import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getDatabase, ref, onValue, DataSnapshot} from "firebase/database";
mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbXN1cXIiLCJhIjoiY2wxOXc4Y3QwMTIzazNqbnd3ZXYyNmZsMyJ9.8QvIQjNW74qt9aE6K-6b7A';

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [zoom, setZoom] = useState('');
  const color =[];
  const ListMarker = [];
  const db = getDatabase();
  const dbRef = ref(db, '/Online Riders'+ '/1234');
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const userIds = Object.keys(data);
    userIds.forEach(userId => {
      const user = data[userId];
      const {Duration, Latitude, Longitude, Name } = user;
      if (Latitude && Longitude) {
        // generate a random color for each marker
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setInterval(() => {
          if (ListMarker.hasOwnProperty(Name)) {
            console.log('hasOwnProperty', Name);
            ListMarker[Name].setLngLat([Longitude, Latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${Name}</h3><p>${Duration}</p>`))
            .addTo(map.current);

          }
          else {
            console.log('not hasOwnProperty', Name);
            const newMarker = new mapboxgl.Marker({
              color,
              size: 'small'
            })
            .setLngLat([Longitude, Latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${Name}</h3><p>${Duration}</p>`))
            .addTo(map.current);
            ListMarker[Name] = newMarker;
          }
        }, 1000);
      }
    });
  });

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [121.5010, 14.3507],
    zoom: 11
    });
  });


  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="container">
      <div className="content">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  )
} 