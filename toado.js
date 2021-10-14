var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  x.innerHTML =
    "Latitude: " + lat + "<br>Longitude: " + long + position.coords.longitude;
  showAddress(lat, long);
  var d = getDistanceFromLatLonInKm(lat, long, 21.013255, 105.5248756);
  x.innerHTML += "<br/>" + d + " km to fBt uni";
}
getLocation();
function showAddress(lat, long) {
  var settings = {
    url:
      "http://api.positionstack.com/v1/reverse?access_key=a39ca257b5ced55aac7e10b3ffdbf419&query=" +
      lat +
      "," +
      long,
    method: "GET",
    timeout: 0,
  };
  //   var arr = [];
  $.ajax(settings).done(function (response) {
    // var arr = JSON.parse(response);
    x.innerHTML +=
      "<br/>" +
      response.data[0].name +
      ", " +
      response.data[0].county +
      ", " +
      response.data[0].region;
    console.log(JSON.stringify(response));
  });
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
