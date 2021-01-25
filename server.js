const parser = require("./js/parser");
const http = require('http');
const port = 8080;


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    parser.findProduct('гречана').then(data => 
        res.write(data));
    //res.end(`LOG: </br>`);
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`The HTTP Server is running on port 8080`);
});

