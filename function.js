window.function = function (coordinates,center,zoom,details,first,last) {

  // data
 coordinates = coordinates.value ?? "";
 center = center.value ?? "";
 zoom = zoom.value ?? "5";
 details = details.value ?? "";
 first = first.value ?? "[0,0]";
 last = last.value ?? "[0,0]";
 

  let ht = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Add a line to a map using a GeoJSON source</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v2.0.2/turf.min.js'></script>
<style>

body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.marker {
  background-image: url("https://i.imgur.com/a0w02ns.png");
  background-size: cover;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  text-align: left;
  font-family: "Open Sans", sans-serif;
}

</style>

</head>
<body>

<div id="map"></div>

<script>
	
mapboxgl.accessToken = 'pk.eyJ1IjoiZHlsYW5kaWNrbWFuIiwiYSI6ImNrdWlqcHdzazBzbXYyd29mM2hmaTVvdHEifQ.HlV_ER1WGiQiDwItCNMisg';

const geojson = {
    'type': 'FeatureCollection',
    'features': [${details}]
};

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dylandickman/cl7sg3360001e14n54oxwti0p',
    center: [${center}],
    maxZoom: 5
});

// add markers to map
for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add it to the map
    new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({
                offset: 25
            }) // add popups
            .setHTML(feature.properties.HTML)
        )
        .addTo(map);
}

map.on('load', () => {
map.addSource('route', {
'type': 'geojson',
'data': {
'type': 'Feature',
'properties': {},
'geometry': {
'type': 'LineString',
'coordinates': [${coordinates}]
}
}
});

map.addLayer({
'id': 'route',
'type': 'line',
'source': 'route',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#ADD8E6',
'line-width': 6
}
});
});

map.fitBounds([${first},${last}],{padding: 200});

</script>
 
</body>
</html>`

  let enc = encodeURIComponent(ht);
  let uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}
