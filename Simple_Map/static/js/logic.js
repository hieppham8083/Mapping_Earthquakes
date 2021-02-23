// Add console.log to check to see if our code is working.
console.log("working");

// create a light tile layer based on Leatlet by mapbox style API 
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY});
    
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "light_Mode": light,
  "dark_Mode": dark
};

/// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    44.0, -80.0
  ],
  zoom: 4,
  layers:[light]
});

 // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/hieppham8083/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

d3.json(torontoData).then((data) => {
  L.geoJSON(data,{
      // add style on lineStrings
      style:{
          "color":"yellow",
          "weight":2 },
      // add popup for each feature
      onEachFeature: function (feature, layer) {
          return layer.bindPopup("<h2> Airline: " +feature.properties.airline+"</h2><hr><h3> Destination: "+ feature.properties.dst +"</h3>")
      }
  }).addTo(map);
})