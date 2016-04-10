var express = require("express"),
 app = express(),
 twilio = require('twilio'),
 slack = require('slack-notify')('https://hooks.slack.com/services/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');


var smsDoorPath = "/sms/door",
    SLACK_CHANNEL_NAME = '#kansas-city_ks-door';
app.post("/sms/door", function (req, res, next) {
    slack.send({
        channel: SLACK_CHANNEL_NAME,
        text: '@channel Someone is at the door. We should help let them in!',
        icon_emoji: ':door:',
        username: 'door bot'
    }, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("message received")
        }
    });
    
    slack.onError = function(error) {
        console.error(error);
    };

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
