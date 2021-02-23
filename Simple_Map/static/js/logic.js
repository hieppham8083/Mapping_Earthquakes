// Add console.log to check to see if our code is working.
console.log("working");

  // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

 // create another tile layer for satelliteStreets
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/satellite-streets-v11',
  accessToken: API_KEY

    });

// create baseMaps
let baseMaps = {
  "Streets": streets,
  "satellite and Streets": satelliteStreets
};

/// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center:[43.7, -79.3],
            zoom: 11,
  layers:[streets]
});

 // Pass our map layers into our layers control and add the layers control to the map.
 L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/hieppham8083/Mapping_Earthquakes/main/torontoNeighborhoods.json";
    
// turn each feature into a marker on the map using pointToLayer
d3.json(torontoHoods).then((data) =>{
  L.geoJSON(data,{
      // add style on lineStrings
      style:{
          "color":"blue",
          "fillColor":"yellow",
          "weight":2 },
      onEachFeature: function (feature, layer) {
          return layer.bindPopup("<h2> Neighborhood: " +feature.properties.AREA_NAME+"</h2>")
      }
  }).addTo(map);
})
