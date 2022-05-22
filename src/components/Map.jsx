import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getDatabase, ref, onValue, DataSnapshot, set} from "firebase/database";
mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbXN1cXIiLCJhIjoiY2wxOXc4Y3QwMTIzazNqbnd3ZXYyNmZsMyJ9.8QvIQjNW74qt9aE6K-6b7A';

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [zoom, setZoom] = useState('');
  
  // create an array of random generated color
  const ListMarker = [];
  const db = getDatabase();
  const coordinate =[];
  const dbRef = ref(db, '/Online Riders'+ '/1234');
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const userIds = Object.keys(data);
    userIds.forEach(userId => {
      const user = data[userId];
      const {Duration, Latitude, Longitude, Name, color } = user;
      if (Latitude && Longitude) {
        coordinate.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [Longitude, Latitude]
          },
          properties: {
            title: Name,
            description: Duration,
            'marker-color': color,
          }
        });
      }
    });
  });

  if (coordinate.length > 0) {
    setInterval(() => {
      coordinate.forEach(coordinate => {
        if (ListMarker.hasOwnProperty(coordinate.properties.title)) {
          // remove marker from map
          ListMarker[coordinate.properties.title].remove();
          const {title, description, 'marker-color': color } = coordinate.properties;
          const newMarker = new mapboxgl.Marker({ color })
          .setLngLat(coordinate.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${title}</h3><p>${description}</p>`))
          .addTo(map.current);

        }
        else {
          const {title, description, 'marker-color': color } = coordinate.properties;
          const newMarker = new mapboxgl.Marker({ color })
          .setLngLat(coordinate.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${title}</h3><p>${description}</p>`))
          .addTo(map.current);
          ListMarker[title] = newMarker;
        }
      });
    }, 1000);
  }

  

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [121.5010, 14.3507],
    zoom: 11
    });

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