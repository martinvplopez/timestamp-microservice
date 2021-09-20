// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let dateResult={
  "unix":0,
  "utc":""
};

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

/* app.get("/api",(req,res)=>{ // Request if the date is empty
  let date=new Date();
  res.json({unix: date.getTime(), utc:date.toUTCString()});
}); */

app.get("/api/:date?",(req,res)=>{
  let dateStr= req.params.date; // Date URL parameter
  let date;
  console.log(dateStr);
  const validDateMs=/^\d+$/;
  if(!dateStr){
    date=Date.now();
    res.json({unix: date, utc:date.toUTCString()});
  }else{
    if(validDateMs.test(dateStr)){  // Date in ms format
      date= new Date(parseInt(dateStr));
      res.json({unix: date.getTime(), utc:date.toUTCString()}); 
    }
    if(new Date(dateStr).toString()!=="Invalid Date"){ // Any parseable date
      //console.log("Como vas a entrar");
      date= new Date(dateStr);
      res.json({unix:date.getTime(), utc:date.toUTCString()});
    }
    else{ // If date isn´t in the formats above it´s an error.
      res.json({ error : "Invalid Date" });
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
