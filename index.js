const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var Lat = String(req.body.latInput);
        console.log(req.body.latInput);
        var Long = String(req.body.longInput);
        console.log(req.body.longInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "21223e71145f84e712ccef41609bcfd9";
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + Lat +"&lon=" + Long  + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
          const Cloudiness = 
            weatherData.clouds.all;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in " + city + " " + " is " + temp + " Degrees Fahrenheit<h2>");
            res.write("<img src=" + imageURL +">");
            res.write("<h3> The Humidity in " + city + " "  + " is " + humidity + " Percent <h3>");
          res.write("<h4> The Wind Speed in "+ city + " " + " is "+ windSpeed + " Miles Per Hour <h4>");
          res.write("<h5> The Cloudiness in " + city + " " + " is " + Cloudiness + " Percent  </h5>" ) ; 
            res.send();
            
        });
    });
})



//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
