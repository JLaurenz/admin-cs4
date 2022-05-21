import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getDatabase, ref, onValue, DataSnapshot} from "firebase/database";
import 'firebase/database';
mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbXN1cXIiLCJhIjoiY2wxOXc4Y3QwMTIzazNqbnd3ZXYyNmZsMyJ9.8QvIQjNW74qt9aE6K-6b7A';

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [zoom, setZoom] = useState('');
  const coordinate =[];

  const db = getDatabase();
  let dbRef = ref(db, 'Online Riders');

  // get realtime data from firebase
  const ref = db.ref('/');
  const onValue = ref.on('value', (snapshot => {
    const data = snapshot.val();
    const keys = [];
    for (let key in data) {
      // push the next data after the key
      keys.push(key);
      coordinate.push({
        name: data[key].Name,
        duration: data[key].Duration,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data[key].Longtitude, data[key].Latitude]
      },
      properties: {
          title: data[key].Name,
          description: data[key].Duration,
          'color': '#' + Math.floor(Math.random() * 16777215).toString(16),
          'marker-size': 'medium',
          'marker-symbol': 'marker'
      }
      });
    }
  }));
  


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