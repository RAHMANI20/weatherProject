// import the express module
const express = require("express");
// import https module
const https = require("https");
// import body-parser : allows us to look through the body of the post request and fetch all the data based on the name of my input
const bodyParser = require("body-parser");
// initialize a new express app
const app = express();

// tell the app to use the body parser and set the urlencoded to use the extended as the true setting
// by doing that we can access to the body of the post request by typing req.body (jason)
app.use(bodyParser.urlencoded({extended:true}))

// what should happen when the user try to go to my home page
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

// what should happen when the user send the city name
app.post("/",function(req,res){

  const query = req.body.city
  const apikey = "80a613f31c73b85a807856eae9f420d9"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
  // send a get request to the api
  https.get(url,function(response){
    console.log(response.statusCode);
    // when we get back some data we call the function
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>the weather is currently "+weatherDescription+"</p>");
      res.write("<h1>the temperature in "+query+" is "+temp+" degrees Celcius</h1>");
      res.write("<img src = '"+imageUrl+"'/>");

      res.send();
    })
  });


})







// listening on port 3000
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
