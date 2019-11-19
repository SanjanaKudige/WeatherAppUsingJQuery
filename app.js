//Store the JSON in weatherData variable
var weatherData;

$(document).ready(function() {
  $.getJSON("weatherData.json", function(data) {
    // console.log(data["cities"]);
    weatherData = data["cities"];
  });
});

$("#searchId").click(function() {
  $("#errorMessages").empty();
  $("#allCards").empty();
  var inputSearch = document.getElementById("inputId").value;
  // console.log("input search: " + inputSearch);

  if (inputSearch.length > 0) {
    var output;
    var test = {};
    // console.log("weather data: " + JSON.stringify(this.weatherData));

    for (var i = 0; i < weatherData.length; i++) {
      var weatherDataName = weatherData[i]["name"];
      // console.log("input search: " + inputSearch);
      if (weatherDataName.toLowerCase() == inputSearch.toLowerCase()) {
        test = weatherData[i];
      }
    }

    if (Object.keys(test).length > 0) {
      if (test.weather.length > 0) {
        var items = [];
        document.getElementById("errorMessages").innerHTML = inputSearch;
        for (var i = 0; i < test.weather.length; i++) {
          outDateTime = $("<p></p>").text(
            test.weather[i].date + "    " + test.weather[i].time
          ).addClass("dateTime");

          outDesc = $("<p></p>").text(
            test.weather[i].weatherInfo[0].description
          ).addClass("weatherInfo");

          outMaxTemp = $("<p></p>")
            .text("Max Temp: " + test.weather[i].weatherInfo[0].maxtemp + String.fromCharCode("8457"))
            .addClass("maxTemp");

          outMinTemp = $("<p></p>")
            .text("Min Temp: " + test.weather[i].weatherInfo[0].mintemp + String.fromCharCode("8457"))
            .addClass("minTemp");

          outHumidity = $("<p>Humidity:</p>")
            .text("Humidity: " + test.weather[i].weatherInfo[0].humidity + "%")
            .addClass("humidity");

          var res = $("<div>").append(
            outDateTime,
            outDesc,
            outMaxTemp,
            outMinTemp,
            outHumidity
          );

          items.push(res);
        }
        $("#allCards").html(items);
      } else {
        document.getElementById("errorMessages").innerHTML =
          "City found, but no weather details available currently";
      }
    } else {
      document.getElementById("errorMessages").innerHTML =
        "No weather data found for the city: " + inputSearch;
    }
  } else {
    document.getElementById("errorMessages").innerHTML =
      "Enter the City name to search";
  }
});

function activateModalEffect() {
  let element = document.getElementById("allCards");
  element.classList.add("attachClass");

  var modal = document.getElementById("myModal");
  modal.classList.add("modal");
}

function deActivateModalEffect() {
  let element = document.getElementById("allCards");
  element.classList.remove("attachClass");
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  activateModalEffect();
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  deActivateModalEffect();
};