
$(document).ready(function () {
    var celcius;
    var farenheit;
    var unit;

    function getWeather(long, lat) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?",
            dataType: "jsonp",
            data: "lat=" + lat + "&lon=" + long + "&appid=aacbf7f4052df19cc3d903aa1afbf36e&units=metric"
        })
            .done(function (data) {
                celcius = data.main.temp;
                farenheit = celcius * 9 / 5 + 32;
                var city = data.name
                var iconUrl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
                unit = "c";

                //console.log(city);
                //console.log(iconUrl);

                $("#weather").attr("src", iconUrl);
                $("#location").html(": " + city);
                $("#temp-value").html("<i class='thermometer half icon'></i>" + celcius + " &#8451;");
            }).fail(function () {
                $("#header").html("Weather couldn't be retrieved... :(");
            });
    }


    function toggleUnit() {
        if (unit == "c") {
            unit = "f";
            $("#temp-value").html("<i class='thermometer half icon'></i>" + farenheit + " &#8457;");
        }
        else {
            unit = "c";
            $("#temp-value").html("<i class='thermometer half icon'></i>" + celcius + " &#8451;");
        }
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        getWeather(-76.77, 18.02)
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0
    };

    $('#load').click(function (e) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords);
                getWeather(position.coords.longitude, position.coords.latitude)
            }, error, options);
        };
    })

    $('#temp-switch').click(function (e) {
        toggleUnit();
    })
});
