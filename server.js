// Run with `node server.js`

var static = require('node-static'),
    port = 8082,    // TODO: configure elsewhere?
    http = require('http');

var file = new static.Server('', {      // TODO: change to "./public" and move files
    cache: 3600,
    gzip: true
} );

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
} ).listen(port);
