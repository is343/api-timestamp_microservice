"use strict";

var express = require('express');
var app = express();

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.json({
      userStories: [
          '1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)',
          '2) If it does, it returns both the Unix timestamp and the natural language form of that date.',
          '3) If it does not contain a date or Unix timestamp, it returns null for those properties.'
          
        ],
      exampleUsage: [
          'https://fair-tendency.glitch.me/May 8, 2016',
          'https://fair-tendency.glitch.me/May%208,%202016',
          'https://fair-tendency.glitch.me/1462665600'
          ],
      exampleOutput: { "unix": 1462665600, "natural": "May 8, 2016" }
  });
});

app.get("/:date", function (req, res) {
  var data = getTime(req.params.date);
  res.json(data);
});



// MAIN FUNCTION
function getTime(date){
  // string => array
  // calculates date from user input
  
  var d,
      unix;
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  
  if (!isNaN(date)){ // if is a number
    d = new Date(Number(date) * 1000);
    unix = Number(date);
  } else { // if a date
    d = new Date(date);
    unix = Math.round((d).getTime() / 1000);
  }
  if(isNaN(d.getMonth())){ // if there's an error when getting date
    return {unix: null, natural: null};
  }
  var natural = monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  var dateArr = {unix: unix, natural: natural};
  return dateArr;
}



// LISTEN FOR REQUESTS
var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
