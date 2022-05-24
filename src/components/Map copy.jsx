
  const dbRef1 = ref(getDatabase());
  get(child(dbRef1, `/Online Riders/1234`)).then((snapshot) => {
    const data = snapshot.val();
    const keys = Object.keys(data);
    keys.forEach(key => {
      const obj = data[key];
      coordinate.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [obj.Longitude, obj.Latitude]
        },
        properties: {
          title: obj.Name,
          description: obj.Duration,
          status: obj.Status,
          color: obj.color
        }
      });
    });
  });



  
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const userIds = Object.keys(data);
    userIds.forEach(userId => {
      const user = data[userId];
      const {Duration, Latitude, Longitude, Name, color } = user;
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
            'status': 'Online'
          }
        });
      }
    });
  });

  setInterval(() => {
    coordinate.forEach(coordinate => {
      const {title, description, 'marker-color': color, 'marker-size': size, 'marker-symbol': symbol} = coordinate.properties;
      if (coordinate.hasOwnProperty('status') && coordinate.status === 'offline') { return; }
      if (ListMarker.hasOwnProperty(title)) {
        // check if coordinate changed
        const marker = ListMarker[title];
        const markerCoordinate = marker.getLngLat();
        if (markerCoordinate.lat !== coordinate.geometry.coordinates[1] || markerCoordinate.lng !== coordinate.geometry.coordinates[0]) {
          marker.setLngLat(coordinate.geometry.coordinates)
          marker.setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${title}</h3><p>${description}</p>`))
          marker.addTo(map.current);
        }
      }
      else {
        const newMarker = new mapboxgl.Marker({ color, size, symbol })
        linelocation[title] = [coordinate.geometry.coordinates];
        newMarker.setLngLat(coordinate.geometry.coordinates)
        newMarker.setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${title}</h3><p>${description}</p>`))
        newMarker.addTo(map.current);
        ListMarker[title] = newMarker;
      }
    });
  }, 1000);
