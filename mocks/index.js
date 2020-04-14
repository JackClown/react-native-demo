var http = require('http');
var mockserver = require('mockserver');

mockserver.headers = ['Authorization'];
 
http.createServer(mockserver('./mocks', true)).listen(8080);
