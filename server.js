var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that the API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204


// your first API endpoint... 
app.get("/api/timestamp", function(req, res) {
    var inputDate = new Date();
  
    res.json({ unix: inputDate.getTime(), utc: inputDate.toUTCString() });
  });
  
  app.get("/api/timestamp/:date_string", function(req, res) {
    var strDate = req.params.date_string;
    console.log("strDate:" + strDate);
    var inputDate = new Date();
    if (strDate != null && strDate != undefined && strDate != "") {
      if (/\d{5,}/.test(strDate)) {
        var dateInt = parseInt(strDate);
        //Date regards numbers as unix timestamps, strings are processed differently
        res.json({ unix: strDate, utc: new Date(dateInt).toUTCString() });
      }
  
      var unixTime = Date.parse(strDate);
      console.log("unixTime: " + unixTime);
      if (isNaN(unixTime)) {
        res.json({ error: "Invalid Date" });
        return;
      }
      inputDate.setTime(unixTime);
    }
    res.json({ unix: inputDate.getTime(), utc: inputDate.toUTCString() });
  });



// listen for requests :)
var defaultPort = 3000;
var listener = app.listen(process.env.PORT || defaultPort, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});