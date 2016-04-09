var express = require("express"),
 app = express(),
 twilio = require('twilio');


var smsDoorPath = "/sms/door";
app.post("/sms/door", function (req, res, next) {
    var twilioResponse = new twilio.TwimlResponse()
    var message = twilioResponse.sms('Welcome to Side Projects Club KC. Someone will be down shortly to help you in.').toString();
    
    res.set('Content-Type', 'text/xml');
    res.status(200);
    res.send(message);
});

app.all("/*", function(req, res, next) {
    res.send("Welcome to the Side Projects Club KC door messenger. This page is not meant to be seen by human eyes .... you need to send a text to 1 620-288-1417 for this application to actually work :(");
});

var port = 3000;
app.listen(port, function() {
   console.log('Side Projects Club door messeger application running on port', port); 
});
