var http = require('http');
  var server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World\n");
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
