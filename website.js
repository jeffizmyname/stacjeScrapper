const http = require("http")
const fs = require('fs')
const path = require('path')
const { getImageLink } = require('./scrapper.js');
const host = 'localhost'
const port = 8000

const requestListener = async function (req, res) {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading HTML file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/getImageLink') {
        try {
            const data = await getImageLink();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data }));
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    } else if (req.url == '/ImageGallery.js') {
        fs.readFile('./ImageGallery.js', function (err, jsFile) {
            if (err) {
                res.send(500, { error: err });
            }
            res.writeHeader(200, { "Content-Type": "text/javascript" });
            res.write(jsFile);
            res.end();
        });
    }
    else {
        res.writeHead(404);
        res.end('Page not found');
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});