/* exported initMap */
"use strict";
var map = null;
var zoom = 13;
var cache = {};
var data = null;
var COLORS = ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02'];
var YEARS = ["2002", "2004", "2006", "2008", "2011", "2013", "2015"];
var year_index = 0;
var playing = false;

// cafes_area or cafes_block
function getData(key, onDataReady) {
  if (key in cache) {
    data = cache[key];
    onDataReady();
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    data = JSON.parse(this.responseText);
    cache[key] = data;
    //console.log("data ready. cache", cache, "data", data);
    onDataReady();
  });
  xhr.open("GET", key + ".json");
  xhr.send();
}

function getColor(cafes, year) {
  var lowest = cafes[YEARS[0]];
  var highest = cafes[YEARS[0]];
  var current = cafes[YEARS[0]];
  for (var i = 1; i < YEARS.length; i++) {
    current = cafes[YEARS[i]];
    if (current < lowest) lowest = current;
    else if (current >  highest) highest = current;
  }

  var c = cafes[year];
  var diff = highest - lowest;
  if (c < lowest + diff * 0.25) return COLORS[0];
  else if (c < lowest + diff * 0.5) return COLORS[1];
  else if (c < lowest + diff * 0.75) return COLORS[2];
  return COLORS[3];
}

function setFeatureStyle(feature) {
  var year = YEARS[year_index];
  if (!data || !data[feature.getId()] || !data[feature.getId()][year]) {
    return {
      fillColor: "white",
      fillOpacity: 0,
      strokeColor: "#6C6C6C",
      strokeWeight: 1
    };
  }
  // {"Carlton": {"2002": 231, "2004": 351,...}, "Kensington": {"2002": ...}};
  var color = getColor(data[feature.getId()], year);
  return {
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: "#6C6C6C",
      strokeWeight: 1
  };
}

function paint() {
  map.data.setStyle(setFeatureStyle);
  document.getElementById("year").textContent = YEARS[year_index];
  document.getElementById("play-year").textContent = YEARS[year_index];
  var slider = document.getElementById("year-slider").MaterialSlider;
  if (slider) slider.change(year_index);
}

function tick() {
  if (!playing) return;
  year_index = (year_index + 1) % YEARS.length;
  paint();
  var delay = (year_index + 1) == YEARS.length ? 3000 : 700;
  setTimeout(tick, delay);

}

function initMap() {
  getData("cafes_area", paint);
  updateSize();
  map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    streetViewControl: false,
    zoom: zoom,
    center: {lat: -37.81, lng: 144.945}
  });
  map.mapTypes.set("gray_map", new google.maps.StyledMapType([{
    "stylers": [
      { "visibility": "simplified" },
      { "lightness": 15 },
      { "saturation": -77 }
    ]}]));
  map.setMapTypeId("gray_map");
  map.data.loadGeoJson("areas.geojson");
  paint();

  map.addListener("zoom_changed", onZoomChange);
  document.getElementById("year-slider").oninput = onPlaySlide;
  document.getElementById("play-button").onclick = onPlayClick;
  window.addEventListener("resize", updateSize, true);
}

function updateSize() {
  var height = window.innerHeight - 92;
  document.getElementById("map").style.height = "" + height + "px";
}

function onZoomChange() {
  if (zoom <= 13 && map.getZoom() > 13 ){
    getData("cafes_block", paint);
    clearMap();
    map.data.loadGeoJson("blocks.geojson");
  }
  else if (zoom > 13 && map.getZoom() <= 13 ){
    getData("cafes_area", paint);
    clearMap();
    map.data.loadGeoJson("areas.geojson");
  }
  zoom = map.getZoom();
}

function onPlayClick() {
  if (playing) stopPlaying();
  else startPlaying();
}

function onPlaySlide() {
  year_index = this.value;
  stopPlaying();
  paint();
}

function stopPlaying() {
    playing = false;
    document.getElementById("button-icon").textContent = "play_arrow";
}

function startPlaying() {
    playing = true;
    document.getElementById("button-icon").textContent = "pause";
    tick();
}

function clearMap() {
  map.data.forEach(function(feature){
    map.data.remove(feature);
  });
}

