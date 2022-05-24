
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
      const newMarker = new mapboxgl.Marker({
        color: obj.color,
        size: 'small',
        symbol: 'marker'
      })
      newMarker.setLngLat([obj.Longitude, obj.Latitude])
      newMarker.setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${obj.Name}</h3><p>${obj.Duration}</p>`))
      newMarker.addTo(map.current);
      ListMarker[obj.Name] = newMarker;
    });
  });
 
  onValue(dbRef1, (snapshot => {
    const data = snapshot.val();
    const keys = Object.keys(data);
    setInterval(() => {
    keys.forEach(key => {
      if (ListMarker.hasOwnProperty(obj.Name)) {
        ListMarker[obj.Name].setLngLat([obj.Longitude, obj.Latitude])
        ListMarker[obj.Name].setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${obj.Name}</h3><p>${obj.Duration}</p>`))
          ListMarker[obj.Name].addTo(map.current);
      }
    }, 1000);
    });
  }));
