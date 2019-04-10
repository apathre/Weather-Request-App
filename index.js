const express = require('express');
const app = express();
const request = require('request');
let ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

let apiKey = 'ec7c00d3fb415abef52730a84a275acd';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
__dirname = path.resolve();
//console.log(__dirname);
app.set('views', (__dirname + '/views'));
app.get('/', (req, res) => {
  res.render('index',{weather:null, error:null});
});

app.post('/', (req, res) => {
  let city = req.body.city;
  
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  request(url, (err, response, body) => {
    
    if (err) {
      
      res.render('index', {weather:null, error: 'Please try again!!' });
    }
    else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', { weather: undefined, error:'Please try again'});
      }
      else {
        let message = 'Its ' + Math.round((weather.main.temp - 273)) + ' degrees ' + 'in ' + weather.name;
        console.log(message);
        res.render('index', { weather: message, error: null });
      }
    }
  });
});
let PORT = process.env.PORT || 3000;
app.listen(PORT);
