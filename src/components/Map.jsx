import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getDatabase, ref, onValue, DataSnapshot, set, child, get} from "firebase/database";
import { Mp, NotListedLocation } from '@mui/icons-material';
import Split from 'react-split';
mapboxgl.accessToken = 'pk.eyJ1Ijoic2VhbXN1cXIiLCJhIjoiY2wxOXc4Y3QwMTIzazNqbnd3ZXYyNmZsMyJ9.8QvIQjNW74qt9aE6K-6b7A';

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [zoom, setZoom] = useState('');

  const linelocation = [];
  
  // create an array of random generated color
  const ListMarker = [];
  const db = getDatabase();
  const coordinate =[];
  var lgeojson;
  const dbRef = ref(db, '/Online Riders'+ '/1234');

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const userIds = Object.keys(data);
    userIds.forEach(userId => {
      const user = data[userId];
      const {Duration, Latitude, Longitude, Name, color, status, route } = user;
      if (Latitude !== undefined && Longitude !== undefined) {
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
            'marker-size': 'medium',
            'marker-symbol': 'marker',
            'status': status
          }
        });
      }
    });
  });

  //marker
  setInterval(() => {
    coordinate.forEach(coordinate => {
      const {title, description, 'marker-color': color, 'marker-size': size, 'marker-symbol': symbol} = coordinate.properties;
      if (coordinate.hasOwnProperty('status') && coordinate.status === 'offline') { return; }
      if (ListMarker.hasOwnProperty(title)) {
        
        const marker = ListMarker[title];
        const markerCoordinate = marker.getLngLat();
        if (markerCoordinate.lat !== coordinate.geometry.coordinates[1] || markerCoordinate.lng !== coordinate.geometry.coordinates[0]) {
          marker.setLngLat(coordinate.geometry.coordinates)
          marker.setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${title}</h3><p>${description}</p>`))
          marker.addTo(map.current);
          linelocation.push({
            title,
            coordinate: marker.getLngLat(),
          });
        }
      }
      else {
        const newMarker = new mapboxgl.Marker({ color, size, symbol })
        if (coordinate.geometry.coordinates === undefined || coordinate.geometry.coordinates === null ) { return }
        newMarker.setLngLat(coordinate.geometry.coordinates)
        newMarker.setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${title}</h3><p>${description}</p>`))
        newMarker.addTo(map.current);
        ListMarker[title] = newMarker;
        linelocation.push({
          title,
          coordinate: newMarker.getLngLat(),
          color: color,
        });
      }
    });

  }, 1000);

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [121.5010, 14.3507],
    zoom: 11
    });

    map.current.on('load', ()=> {
      if(map.current.getSource('route')){
        map.current.removeSource('route');
      }
      map.current.addSource('route', {
        type: 'geojson',
        data: lgeojson
      });
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#BF93E4',
          'line-width': 5
        }
      });
    })

    if (!map.current) return;
    map.current.on('move', () => {
    // setLng(map.current.getCenter().lng.toFixed(4));
    // setLat(map.current.getCenter().lat.toFixed(4));
    // setZoom(map.current.getZoom().toFixed(2));

    });

    const base1 = new mapboxgl.Marker({
      color: '#ff0000',
      size: 'large',
      symbol: 'home'
    });
    base1.setLngLat([121.41402295374215 , 14.280144331354549]);
    base1.setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h3>J&T</h3><p>Sta Cruz</p>`))
    base1.addTo(map.current);    
    });

  return (
    <div className="container">
      <div className="content">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  )
}