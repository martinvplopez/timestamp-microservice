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

app.get("/api",(req,res)=>{ // Request if the date is empty
  let date=Date.now();
  dateResult.unix=date;
  dateResult.utc=new Date(date).toUTCString();
  res.json(dateResult);
});

app.get("/api/:date",(req,res)=>{
  const validDateMs=/^\d+$/;
  let date= req.params.date.toString(); // Date URL parameter
  console.log(date);
  if(validDateMs.test(date)){  // Date in ms format
    date=parseInt(date);
    let dateStr= new Date(date).toUTCString();
    dateResult.unix=date;
    dateResult.utc=dateStr;
    res.json(dateResult); 
  }
  if(isNaN(Date.parse(date))===false){ // Any parseable date
    //console.log("Como vas a entrar");
    let test=Date.parse(date)*1000;
    test=new Date(test);
    dateResult.unix=test/1000;
    dateResult.utc=new Date(dateResult.unix).toUTCString();
    res.json(dateResult);
  }
  else{ // If date isn´t in the formats above it´s an error.
    res.json({ error : "Invalid Date" });
  }
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
