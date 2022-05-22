import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getDatabase, ref, onValue} from "firebase/database";
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
    const ref = db.ref('/');

    

    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [121.5010, 14.3507],
        zoom: 11
        });
    });

    setInterval(() => {
        // if coordinate status is offline, create a new marker
        coordinate.forEach(coordinate => {
          if (coordinate.hasOwnProperty('status') && coordinate.status === 'offline') {
            const {title, description, 'marker-color': color, 'marker-size': size, 'marker-symbol': symbol} = coordinate.properties;
            const newMarker = new mapboxgl.Marker({
              color,
              size,
              symbol
            })
            .setLngLat(coordinate.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${title}</h3><p>${description}</p>`))
            .addTo(map.current);
            ListMarker.push(newMarker);
            coordinate.properties.status = 'Online';
          }
          else {
            ListMarker[title].setLngLat(coordinate.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${title}</h3><p>${description}</p>`))
            .addTo(map.current);
          }
        });
      }, 1000);
    

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