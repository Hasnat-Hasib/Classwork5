var http = require('http');
var fs = require('fs');
  var server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('index.html', function(err, data){
        if(err){
            return console.log(err);
            }
            
    
    res.end(data);
  });
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });
