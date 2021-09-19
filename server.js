// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date",(req,res)=>{
  let validDate= /^\d{4}-\d{2}-\d{2}$/;
  let validDateMs=/^\d+$/;
  let date= req.params.date.toString(); // Date URL parameter

  // Checking the date
  if(validDate.test(date)){ // Date in yyyy/mm/dd format

  }
  else if(validDateMs.test(date)){  // Date in yyyy/mm/dd format

  }else{
    res
  }
  console.log(date);
});



// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
