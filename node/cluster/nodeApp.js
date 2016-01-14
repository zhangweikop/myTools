const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

var redis = require('redis');

// Setup Redis pub/sub.
// NOTE: You must create two Redis clients, as 
// the one that subscribes can't also publish.
var pub = redis.createClient();
var sub = redis.createClient();
sub.subscribe('global');


// Listen for messages being published to this server.
sub.on('message', function(channel, msg) {
  // Broadcast the message to all connected clients on this server.
  
    others = msg.slice();
  
});


var requests = [];
var others =[];
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < 2; i++) {
    cluster.fork();
  }
  console.log("master:"+process.pid);
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log("worker:"+process.pid);
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    requests.push(req);
     pub.publish('global', requests);
    console.log(process.pid +"called: " + requests.length + "  others:"+ others.length);
    
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.write("<html>"+"<br>");
   
    requests.forEach(function (item, index, array) {
  res.write(item.url+"<br>");});
    res.end(requests.length+' hello world\n<html>');
  }).listen(8000);
}
