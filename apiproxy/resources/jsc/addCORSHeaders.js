// Add-CORS-Headers.js

var response = context.getResponse();
var requestOrigin = context.getRequest().headers.origin;

// Allow requests from a specific origin (replace with your frontend domain)
var allowedOrigin = 'http://localhost:3001';
//remove '*' --> ''
response.headers['Access-Control-Allow-Origin'] = (requestOrigin === allowedOrigin) ? requestOrigin : '*';

// Add other necessary CORS headers
response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Origin';
response.headers['Access-Control-Allow-Credentials'] = 'true';
response.headers['Access-Control-Max-Age'] = '86400';