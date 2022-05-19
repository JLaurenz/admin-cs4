import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../Styles/Home.css';
import { getDatabase, ref, onValue} from "firebase/database";
import 'firebase/database';
import { duration } from '@mui/material';
mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbXN1cXIiLCJhIjoiY2wxOXc4Y3QwMTIzazNqbnd3ZXYyNmZsMyJ9.8QvIQjNW74qt9aE6K-6b7A';

export default function Home() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');
    const [zoom, setZoom] = useState('');
    const coordinate =[];


    const db = getDatabase();
    const dbRef = ref(db, '/Online Riders'+ '/1234');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      // go in the userIds array and get the Latitude , Longitude and Name
      const userIds = Object.keys(data);
      userIds.forEach(userId => {
        const user = data[userId];
        const {Duration, Latitude, Longitude, Name } = user;
        // push to coordinate array if the Latitude and Longitude is not empty
        if (Latitude && Longitude) {
          // if duration is empty, set it to 0
          // create a random color for the marker
          const color = Duration ? '#' + Math.floor(Math.random() * 16777215).toString(16) : '#000000';
          coordinate.push({
            // push a json object
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [Longitude, Latitude]
            },
            properties: {
              title: Name,
              description: Duration,
              'marker-color': color,
              'marker-size': 'medium',
              'marker-symbol': 'marker'
            }
          });
        }
        }
      );
    });
    // loop through the coordinate array and add marker to the map
    coordinate.forEach(coordinate => {
      // check if the marker is still on the map
      if (map.current) {
        // create a new marker
        const marker = new mapboxgl.Marker(coordinate);
        // add the marker to the map
        marker.setLngLat(coordinate.geometry.coordinates).addTo(map.current);
      }
    });
    
  


    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [121.4000, 14.2507],
        zoom: 14
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