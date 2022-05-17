import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../Styles/Home.css';
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import 'firebase/database';


mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbXN1cXIiLCJhIjoiY2wxOXc4Y3QwMTIzazNqbnd3ZXYyNmZsMyJ9.8QvIQjNW74qt9aE6K-6b7A';

export default function Home() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');
    const [zoom, setZoom] = useState('');
    const coordinate =[];
    var database = firebase.database;

    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [121.4692, 14.1407],
        zoom: 10
        });
    });
    // reload this code
    // listen to realtime database
    const db = getDatabase();
    const dbRef = database.ref(db, '/Online Riders'+ '/1234');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      // go in the userIds array and get the Latitude , Longitude and Name
      const userIds = Object.keys(data);
      userIds.forEach(userId => {
        const user = data[userId];
        const {Duration, Latitude, Longitude, Name } = user;
        // push to coordinate array if the Latitude and Longitude is not empty
        if (Latitude && Longitude) {
          coordinate.push({
            Duration,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [Longitude, Latitude]
            },
            properties: {
              title: Name,
              description: 'Current Location'
            }
          });
        }
      });
      coordinate.forEach(marker => {
        // if the marker is not empty
        if (marker) {
          // create a new marker 
          new mapboxgl.Marker()
          .setLngLat(marker.geometry.coordinates)
          // create a popup for every marker
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p><p>${marker.Duration}</p>`))
          .addTo(map.current);
        }
        // else update the marker
        else {
          const marker = new mapboxgl.Marker()
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p><p>${marker.Duration}</p>`))
          .addTo(map.current);
        }
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