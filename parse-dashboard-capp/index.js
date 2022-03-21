var express = require('express');
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/api",
      "appId": "KmDW6ET9Px",
      "masterKey": '/f?71gfHPN?ia;5}3hD.dRAot(iOwd`_r2"*W~<w17}*,JuPL<Omf6nf|cF*P:_',
      "appName": 'CAPP'
    }
  ]
});

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);


module.exports = {
    app,
  };