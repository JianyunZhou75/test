var express = require('express')
var app= express()
var port = process.env.PORT||3000;
app.get('/', function(req, res) {
  res.send('Hello World\n')
})
app.listen(port)

console.log("My first node application is running on Port"+ port);